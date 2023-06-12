const multer = require('multer');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = {
  upload,
};
