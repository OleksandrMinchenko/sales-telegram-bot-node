const util = require('util');
const { gc } = require('../config/index');

// /**
//  *
//  * @param { File } object file object that will be uploaded
//  * @description - This function does the following
//  * - It uploads a file to the image bucket on Google Cloud
//  * - It accepts an object as an argument with the
//  *   "originalname" and "buffer" as keys
//  */

const BUCKET_NAME = 'photo-for-sales-chanel'

const uploadImage = file =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    // console.log(originalname);

    const blob = gc
      .bucket(BUCKET_NAME)
      .file(originalname.replace(/ /g, '_'));

    // console.log(blob);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    // console.log(blobStream);
    blobStream
      .on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${blob.name}`;

        resolve(publicUrl);
      })
      .on('error', () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });

module.exports = { uploadImage };
