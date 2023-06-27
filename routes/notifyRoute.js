const express = require('express');
const router = express.Router();

const { upload } = require('../middlewares/uploadMiddleware');

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  keyFilename: '../node/routes/telegram-bot-d339c-637388e66693.json',
});

router.get('/', function (req, res) {
  res.send('Hello World');
});

router.post(
  '/photos/upload',
  upload.array('photos', 5),
  function (req, res, next) {
    console.log(req.files);
    res.send({
      status: 'success',
      message: 'File successfully uploaded',
      data: {
        ...req.files,
      },
    });
  }
);

router.post(
  '/form/upload',
  upload.array('photos', 5),
  function (req, res, next) {
    console.log('/form/upload ====>', req);
    console.log('/form/upload files ====>', req.body.files);
    console.log('/form/upload other ====>', req.body.other);
    res.send({
      status: 'success',
      message: 'File successfully uploaded',
      data: {
        ...req.files,
      },
    });
  }
);

router.post('/check', function (req, res) {
  console.log('/check====>', req.body);

  const checkPhoto = async () => {
    const [result] = await client.safeSearchDetection(
      // 'https://firebasestorage.googleapis.com/v0/b/telegram-bot-d339c.appspot.com/o/photo%2Fjune%2F1687848306874-girl-avatar.jpg?alt=media&token=01ee4688-cb50-406b-be07-282c9cb6eef2'
      '../node/uploads/1687845345797 - girl-avatar.jpg'
    );

    const detections = result.safeSearchAnnotation;
    console.log(`Adult: ${detections.adult}`);
    console.log(`Spoof: ${detections.spoof}`);
    console.log(`Medical: ${detections.medical}`);
    console.log(`Violence: ${detections.violence}`);
  };

  checkPhoto();

  res.send({
    status: 'success',
    message: 'File successfully uploaded',
    data: {
      ...req.body,
    },
  });
});

module.exports = { notifyRoutes: router };
