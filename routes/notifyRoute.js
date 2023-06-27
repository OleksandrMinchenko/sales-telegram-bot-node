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

router.post('/check', async (req, res) => {
  console.log('/check req.params ====>', req.params);
  const { photoUrl } = req.body;

  // check safety
  const [result] = await client.safeSearchDetection(
    photoUrl
    // 'https://firebasestorage.googleapis.com/v0/b/telegram-bot-d339c.appspot.com/o/photo%2Fjune%2F1687848306874-girl-avatar.jpg?alt=media&token=01ee4688-cb50-406b-be07-282c9cb6eef2'
    // '../node/uploads/1687845345797 - girl-avatar.jpg'
  );

  // https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.SafeSearchAnnotation
  // https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#likelihood
  const detections = result.safeSearchAnnotation;
  const resCheck = {
    adult: { chance: detections.adult, desc: 'для дорослих' },
    spoof: {
      chance: detections.spoof,
      desc: 'Імовірність підробки щоб воно виглядало смішним або образливим',
    },
    medical: { chance: detections.medical, desc: 'медичне зображення' },
    violence: { chance: detections.violence, desc: 'насильницький вміст' },
    racy: { chance: detections.racy, desc: 'непристойний вміст' },
  };

  // check labels
  const [labels] = await client.labelDetection(photoUrl);
  const arrayLabels = labels.labelAnnotations;
  const descriptions = arrayLabels.map(item => item.description);

  res.send({
    status: 'success',
    message: 'File successfully uploaded',
    data: {
      photoUrl,
      resCheck,
      descriptions,
    },
  });
});

module.exports = { notifyRoutes: router };

// UNKNOWN	Невідома ймовірність.
// VERY_UNLIKELY	Це дуже малоймовірно.
// UNLIKELY	Це малоймовірно.
// POSSIBLE	Можливо.
// LIKELY	Це ймовірно.
// VERY_LIKELY	Це дуже ймовірно.
