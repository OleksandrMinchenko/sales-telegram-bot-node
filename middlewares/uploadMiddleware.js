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

const multerErrorHandling = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send('Multer error: ' + err.message);
  } else {
    next();
  }
};

module.exports = {
  upload,
  multerErrorHandling,
};
