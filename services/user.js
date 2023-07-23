// https://cloud.google.com/firestore/docs/create-database-server-client-library?_ga=2.122427979.-1971520172.1684677818
// https://cloud.google.com/firestore/docs/query-data/queries

const { Timestamp } = require('@google-cloud/firestore');
const { db } = require('../config/firestore');

const writeToDb = async data => {
  const uniqueId = Date.now().toString();

  const userRef = db
    .collection('users')
    .doc(data.user)
    .collection('messages')
    .doc(uniqueId);

  try {
    const { _writeTime } = await userRef.set({
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });

    return _writeTime;
  } catch (error) {
    console.log('writeToDb error ======== >>>>>> ', error);
    return error;
  }
};

module.exports = {
  writeToDb,
};
