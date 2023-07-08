const express = require('express');
const router = express.Router();

const {
  checkOnePhotoSendCloud,
  checkSomePhotosSendCloud,
} = require('../services/photo');

const {
  multerMid,
  multerErrorHandling,
} = require('../middlewares/uploadMiddleware');

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

module.exports = { notifyRoutes: router };
