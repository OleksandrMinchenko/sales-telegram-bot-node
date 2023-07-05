const express = require('express');
const router = express.Router();

const {
  checkContentSomePhotos,
  checkContentOnePhoto,
} = require('../services/photo');

const {
  upload,
  multerErrorHandling,
} = require('../middlewares/uploadMiddleware');

router.post('/check-one-photo', checkContentOnePhoto);

router.post(
  '/check-photos',
  upload.array('photos', 5),
  multerErrorHandling,
  checkContentSomePhotos
);

module.exports = { notifyRoutes: router };
