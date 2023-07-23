const express = require('express');
const router = express.Router();

const {
  checkOnePhotoSendCloud,
  checkSomePhotosSendCloud,
  checkSomePhotosSendCloudByAdmin,
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

router.post(
  '/some-by-admin',
  multerMid.array('photos', 5),
  multerErrorHandling,
  checkSomePhotosSendCloudByAdmin
);

module.exports = { notifyRoutes: router };
