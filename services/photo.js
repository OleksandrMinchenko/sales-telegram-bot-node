const { visionCheck } = require('../middlewares/visionMiddleware');
const { uploadImage } = require('../helpers/uploadImageToBucket');
const fs = require('fs').promises;
const path = require('path');

const checkOnePhotoSendCloud = async (req, res, next) => {
  try {
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile);

    const checkImageContent = await visionCheck(
      imageUrl,
      {},
      {
        safe: true,
        label: true,
        langSafe: 'ua',
      }
    );

    res.status(200).json({
      message: 'Upload was successful',
      data: { imageUrl, checkImageContent },
    });
  } catch (error) {
    next(error);
  }
};

const checkSomePhotosSendCloud = async (req, res) => {
  const arrayPhotos = req.files;
  console.log('arrayPhotos ', arrayPhotos);

  const unresolvedPromises = arrayPhotos.map(async item => {
    const imageUrl = await uploadImage(item);

    const checkImageContent = visionCheck(
      imageUrl,
      {},
      {
        safe: true,
        label: true,
        langSafe: 'ua',
      }
    );
    return checkImageContent;
  });

  console.log('before resultCheck ============>');
  const resultCheck = await Promise.all(unresolvedPromises);
  console.log('resultCheck', resultCheck);
  // remove photos
  // arrayPath.map(item => {
  //   fs.unlink(item, error => {
  //     if (error) {
  //       res.status(500).send('fs.unlink: ' + error.message);
  //     }
  //   });
  // });

  res.send({
    status: 'success',
    resultCheck,
  });
};

// form-data
const checkContentSomePhotos = async (req, res) => {
  const arrayPhotos = req.files;
  console.log('arrayPhotos ', arrayPhotos);

  let arrayPath = [];
  console.log('before unresolvedPromises ============>');

  const unresolvedPromises = arrayPhotos.map(item => {
    // const path = path.join('uploads', item.filename);
    const path = path.join(__dirname, 'uploads', item.filename);
    console.log('item.filename ============>', item.filename);
    console.log('__dirname ============>', __dirname);
    console.log('path ============>', path);
    arrayPath.push(path);

    const res = visionCheck(path, item, {
      safe: true,
      label: true,
      // langSafe: 'ua',
    });

    return res;
  });

  console.log('before resultCheck ============>');
  const resultCheck = await Promise.all(unresolvedPromises);
  console.log(resultCheck);
  // remove photos
  arrayPath.map(item => {
    fs.unlink(item, error => {
      if (error) {
        res.status(500).send('fs.unlink: ' + error.message);
      }
    });
  });

  res.send({
    status: 'success',
    resultCheck,
  });
};

// json content {photoUrl: 'http//....'}
const checkContentOnePhoto = async (req, res) => {
  const { photoUrl } = req.body;

  const result = await visionCheck(
    photoUrl,
    {},
    {
      safe: true,
      label: true,
      langSafe: 'ua',
    }
  );

  res.send({
    status: 'success',
    message: 'File successfully uploaded',
    data: result,
  });
};

module.exports = {
  checkOnePhotoSendCloud,
  checkSomePhotosSendCloud,

  checkContentSomePhotos,
  checkContentOnePhoto,
};
