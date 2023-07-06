const express = require('express');
const router = express.Router();

const {
  checkOnePhotoSendCloud,
  checkContentSomePhotos,
  checkContentOnePhoto,
} = require('../services/photo');

const {
  multerMid,
  upload,
  multerErrorHandling,
} = require('../middlewares/uploadMiddleware');

// new
router.post('/uploads', multerMid.single('file'), checkOnePhotoSendCloud);

// new

router.post('/check-one-photo', checkContentOnePhoto);

router.post(
  '/check-photos',
  upload.array('photos', 5),
  multerErrorHandling,
  checkContentSomePhotos
);

module.exports = { notifyRoutes: router };
