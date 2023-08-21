const { visionCheck } = require('../middlewares/visionMiddleware');
const { uploadImage } = require('../helpers/uploadImageToBucket');

const checkOnePhotoSendCloud = async (req, res, next) => {
  const myFile = req.file;
  try {
    const imageUrl = await uploadImage(myFile);

    const result = await visionCheck(imageUrl);

    res.send({
      status: 'Upload was successful',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const checkSomePhotosSendCloud = async (req, res, next) => {
  const arrayPhotos = req.files;
  try {
    const unresolvedPromises = arrayPhotos.map(async item => {
      const imageURL = await uploadImage(item);

      const checkImageContent = visionCheck(imageURL);
      return checkImageContent;
    });

    const result = await Promise.all(unresolvedPromises);

    res.send({
      status: 'Upload was successful',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const somePhotosSendCloudByAdmin = async (req, res, next) => {
  const arrayPhotos = req.files;
  try {
    const unresolvedPromises = arrayPhotos.map(async item => {
      const imageURL = await uploadImage(item);
      return { imageURL };
    });

    const result = await Promise.all(unresolvedPromises);

    res.send({
      status: 'Upload was successful',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const onePhotosSendCloudByAdmin = async (req, res, next) => {
  const myFile = req.file;
  try {
    const imageURL = await uploadImage(myFile);

    res.send({
      status: 'Upload was successful',
      result: { imageURL },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkOnePhotoSendCloud,
  checkSomePhotosSendCloud,
  somePhotosSendCloudByAdmin,
  onePhotosSendCloudByAdmin,
};
