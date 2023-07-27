const Firestore = require('@google-cloud/firestore');
const { STORAGE_PROJECT_KEY } = require('./bucket');
console.log('STORAGE_PROJECT_KEY', STORAGE_PROJECT_KEY);

const db = new Firestore({
  credentials: STORAGE_PROJECT_KEY,
  projectId: STORAGE_PROJECT_KEY.PROJECT_ID_BUCKET,
});

console.log('db', db);

module.exports = { db };
