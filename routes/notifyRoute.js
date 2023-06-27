const express = require('express');
const router = express.Router();

const { upload } = require('../middlewares/uploadMiddleware');
const { visionCheck } = require('../middlewares/visionMiddleware');

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

  const result = await visionCheck(photoUrl, {
    safe: true,
    label: true,
    langSafe: 'ua',
  });

  res.send({
    status: 'success',
    message: 'File successfully uploaded',
    data: result,
  });
});

module.exports = { notifyRoutes: router };
