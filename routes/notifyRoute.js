const express = require('express');
const router = express.Router();

const { upload } = require('../middlewares/uploadMiddleware');

router.get('/', function (req, res) {
  res.send('Hello World');
});

// router.post('/onefile', function (req, res) {
//   console.log('req.files ===== >>>> ', req.files);
//   try {
//     if (!req.files) {
//       return res.json({
//         status: 'failed',
//         message: 'No file',
//       });
//     }

//     let file = req.files.file;
//     console.log('req.files', req.files);
//     file.mv('./uploads/' + file.name);

//     res.send({
//       status: 'success',
//       message: 'File successfully uploaded',
//       data: {
//         name: file.name,
//         mimetype: file.mimetype,
//         size: file.size,
//       },
//     });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// router.post('/profile', upload.single('photo1'), function (req, res, next) {
//   console.log(req.file);
//   res.send({
//     status: 'success',
//     message: 'File successfully uploaded',
//     data: {
//       ...req.file,
//     },
//   });
// });

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

module.exports = { notifyRoutes: router };
