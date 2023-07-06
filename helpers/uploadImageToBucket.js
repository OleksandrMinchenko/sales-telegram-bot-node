const util = require('util');
require('dotenv').config();
const { gc } = require('../config/bucket');

const BUCKET_NAME = process.env.BUCKET_NAME;

const uploadImage = file =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    // console.log(originalname);

    const blob = gc.bucket(BUCKET_NAME).file(originalname.replace(/ /g, '_'));

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
