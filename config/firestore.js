const Firestore = require('@google-cloud/firestore');
const { STORAGE_PROJECT_KEY } = require('./bucket');

const db = new Firestore({
  credentials: STORAGE_PROJECT_KEY,
  projectId: STORAGE_PROJECT_KEY.PROJECT_ID_BUCKET,
});

module.exports = { db };
