const multer = require("multer");
const path = require("path");
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/images/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(16).toString('hex')}`;
    const filename = `product-${uniqueSuffix}${path.extname(file.originalname)}`;
    console.log(`Image filename generated: ${filename}`);
    cb(null, filename);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extname) {
    console.log(`Image file accepted: ${file.originalname}`);
    return cb(null, true);
  }

  console.log(`Image file rejected: ${file.originalname}`);
  cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed"));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

module.exports = upload;

