const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const { VISION_PROJECT_KEY } = require('../middlewares/visionMiddleware');
require('dotenv').config();

const BUCKET_PROJECT_KEY = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID_BUCKET,
  private_key: process.env.PRIVATE_KEY_BUCKET,
  client_email: process.env.CLIENT_MAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
  client_x509_cert_url: process.env.CLIENT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

const config = {
  autoRetry: true,
  bucket: process.env.BUCKET_NAME,
  projectId: process.env.PROJECT_ID,
  credentials: BUCKET_PROJECT_KEY,
  filename: (req, file, cb) => {
    cb(null, `./uploads/${Date.now()} - ${file.originalname}`);
  },
};

const uploudGoogleCloud = multer({
  storage: multerGoogleStorage.storageEngine(config),
});

module.exports = { uploudGoogleCloud };
