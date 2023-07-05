const { Storage } = require('@google-cloud/storage');
const path = require('path');
require('dotenv').config();

const KEY = {
    type: process.env.TYPE_BUCKET,
    project_id: process.env.PROJECT_ID_BUCKET,
    private_key_id: process.env.PRIVATE_KEY_ID_BUCKET,
    private_key: String(process.env.PRIVATE_KEY_BUCKET),
    client_email: process.env.CLIENT_MAIL_BUCKET,
    client_id: process.env.CLIENT_ID_BUCKET,
    auth_uri: process.env.AUTH_URI_BUCKET,
    token_uri: process.env.TOKEN_URI_BUCKET,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_BUCKET,
    client_x509_cert_url: process.env.CLIENT_URL_BUCKET,
    universe_domain: process.env.UNIVERSE_DOMAIN_BUCKET,
};
console.log(String(KEY.private_key));

const gc = new Storage({
  //   keyFilename: path.join(__dirname, './telegram-bot-keys.json'),
  credentials: KEY,
  projectId: process.env.PROJECT_ID_BUCKET,
});

// check connect to bucket
// gc.getBuckets().then(x => console.log(x));

module.exports = { gc };
