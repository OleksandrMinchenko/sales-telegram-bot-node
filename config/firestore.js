const Firestore = require('@google-cloud/firestore');
const { STORAGE_PROJECT_KEY } = require('./bucket');
require('dotenv').config();

const db = new Firestore({
  credentials: STORAGE_PROJECT_KEY,
  projectId: process.env.PROJECT_ID_BUCKET,
});

module.exports = { db };
