const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "dhuhidibisd";

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (password != admin.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

