const { visionCheck } = require('../middlewares/visionMiddleware');
const fs = require('fs').promises;

// form-data
const checkContentSomePhotos = async (req, res) => {
  const arrayPhotos = req.files;

  let arrayPath = [];

  const unresolvedPromises = arrayPhotos.map(item => {
    const path = `../node/uploads/${item.filename}`;
    arrayPath.push(path);

    const res = visionCheck(path, {
      safe: true,
      label: true,
      // langSafe: 'ua',
    });

    return res;
  });

  const resultCheck = await Promise.all(unresolvedPromises);

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
    myPhotos: { ...req.files },
    resultCheck,
  });
};

// json content {photoUrl: 'http//....'}
const checkContentOnePhoto = async (req, res) => {
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
};

module.exports = {
  checkContentSomePhotos,
  checkContentOnePhoto,
};
