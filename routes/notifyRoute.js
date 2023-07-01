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
const {
  uploudGoogleCloud,
} = require('../middlewares/uploadGoogleCloudMiddleware');

router.post('/check-one-photo', checkContentOnePhoto);

// router.post(
//   '/check-photos',
//   upload.array('photos', 5),
//   multerErrorHandling,
//   checkContentSomePhotos
// );

router.post(
  '/check-photos',
  uploudGoogleCloud.array('photos', 5),
  // multerErrorHandling,
  checkContentSomePhotos
);

// app.post('/upload', uploudGoogleCloud.any(), function (req, res) {
//   console.log(req.files);
//   res.json(req.files);
// });

module.exports = { notifyRoutes: router };
