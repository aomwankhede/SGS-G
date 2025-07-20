require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const upload = require('./middleware/multer');
const Donation = require('./models/Donation');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const Admin  = require('./models/admin');
const PDFDocument = require('pdfkit');


 

async function sendCertificateByEmail(
  body,
  transactionId,
  senderEmailId,
  subject
) {
  // Step 1: Create PDF certificate
  console.log('In it!!');
  const certFolder = path.join(__dirname, 'certificate');
  if (!fs.existsSync(certFolder)) {
    fs.mkdirSync(certFolder);
  }

  const pdfPath = path.join(certFolder, `${transactionId}.pdf`);
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(pdfPath));

  // Design the certificate (you can modify layout, fonts, etc.)
  doc.fontSize(26).text('Certificate of Donation', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Transaction ID: ${transactionId}`);
  doc.moveDown();
  doc.text(`Details: ${body}`);
  doc.moveDown();
  doc.text('Thank you for your generous contribution!', { align: 'center' });

  doc.end();

  // Wait for the PDF to finish writing
  // await new Promise((resolve) => doc.on('finish', resolve));

  console.log(
    'Created Certificate',
    process.env.SERVER_EMAIL,
    process.env.SERVER_EMAIL_PASS
  );

  // Step 2: Send email using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SERVER_EMAIL,
      pass: process.env.SERVER_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SERVER_EMAIL,
    to: senderEmailId,
    subject: subject,
    text: `Hello,\n\nPlease find attached your certificate.\n\n${body}`,
    attachments: [
      {
        filename: `${transactionId}.pdf`,
        path: pdfPath,
      },
    ],
  };

  try {
    console.log('Sending Certificate to ');
    console.log(senderEmailId);
    await transporter.sendMail(mailOptions);
    console.log(`Certificate sent to ${senderEmailId}`);
  } catch (err) {
    console.error('Error sending email:', err);
  }
}

//Connect to database
const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const app = express();

app.use(express.json()); 
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Application up ans running' });
});

// CREATE Donation
app.post('/donations', upload.single('transactionImage'), async (req, res) => {
  try {
    const data = {
      ...req.body,
      transactionImage: req.file ? `/uploads/${req.file.filename}` : undefined,
    };

    const donation = new Donation(data);
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// READ All Donations
app.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/donations/:id/verify', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    donation.isVerified = true;
    await donation.save();
    sendCertificateByEmail(
      'Thank you for you donation',
      donation.transactionId,
      donation.emailId,
      'Om Ganeshay Namah!!'
    );
    res.status(200).json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Donation
app.put(
  '/donations/:id',
  upload.single('transactionImage'),
  async (req, res) => {
    try {
      const updates = req.body;
      if (req.file) {
        updates.transactionImage = `/uploads/${req.file.filename}`;
      }
      const donation = await Donation.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true }
      );
      if (!donation)
        return res.status(404).json({ error: 'Donation not found' });
      res.status(200).json(donation);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// DELETE Donation
app.delete('/donations/:id', async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    const fileName = donation.transactionId + '.png';
    const filePath = path.join(__dirname, 'uploads', fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${fileName}`);
    } else {
      console.log(`File not found: ${fileName}`);
    }

    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/login',async(req,res)=>{
   const { email, password } = req.body;
   console.log("email:",email);
   console.log("password:",password);

  try {
    // 1. Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (password != admin.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(process.env.PORT, async () => {
  if (await conn()) {
    console.log('Database connected successfully');
  } else {
    console.log('Database connection failed');
  }
  console.log(`Application listening on ${process.env.PORT}`);
});
