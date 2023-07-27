const multer = require('multer');

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 10mb.
    fileSize: 10 * 1024 * 1024,
  },
});

const multerErrorHandling = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send('Multer error: ' + err);
  } else {
    next();
  }
};

module.exports = {
  multerMid,
  multerErrorHandling,
};
