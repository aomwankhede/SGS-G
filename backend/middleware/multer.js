const multer = require("multer");
const fs = require("fs")
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = req.body.transactionId;
    cb(null, uniqueSuffix + pathname(file.originalname));
  }
});




const upload = multer({ storage });

module.exports = upload