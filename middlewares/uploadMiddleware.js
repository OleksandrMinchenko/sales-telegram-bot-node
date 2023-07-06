const multer = require('multer');

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});

// ========= to local folder
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

const multerErrorHandling = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send('Multer error: ' + err.message);
  } else {
    next();
  }
};

module.exports = {
  multerMid,
  upload,
  multerErrorHandling,
};
