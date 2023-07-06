const express = require('express');
const router = express.Router();

const {
  checkOnePhotoSendCloud,
  checkSomePhotosSendCloud,

  checkContentSomePhotos,
  checkContentOnePhoto,
} = require('../services/photo');

const {
  multerMid,
  upload,
  multerErrorHandling,
} = require('../middlewares/uploadMiddleware');

// new
router.post(
  '/one',
  multerMid.single('photo'),
  multerErrorHandling,
  checkOnePhotoSendCloud
);

router.post(
  '/some',
  multerMid.array('photos', 5),
  multerErrorHandling,
  checkSomePhotosSendCloud
);

// new

// router.post('/check-one-photo', checkContentOnePhoto);

// router.post(
//   '/check-photos',
//   upload.array('photos', 5),
//   multerErrorHandling,
//   checkContentSomePhotos
// );

module.exports = { notifyRoutes: router };
