// https://cloud.google.com/firestore/docs/create-database-server-client-library?_ga=2.122427979.-1971520172.1684677818
// https://cloud.google.com/firestore/docs/query-data/queries
require('dotenv').config();
const collection = process.env.COLLECTION;

const { Timestamp, FieldValue } = require('@google-cloud/firestore');
const { db } = require('../config/firestore');

const writeToDb = async data => {
  const uniqueId = Date.now().toString();

  if (!data.user) {
    data.user = 'anonym';
  }

  const userRef = db
    .collection(collection)
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

const writeUserToDb = async data => {
  const { chat, from, date } = data;
  console.log('writeUserToDb ', data);

  const userRef = db.collection(collection).doc('countSubscriber');
  try {
    const { _writeTime } = await userRef.update({
      installBot: FieldValue.arrayUnion({ chat, from, date }),
    });
    console.log(
      'writeUserToDb success ======== >>>>>> _writeTime: ',
      _writeTime
    );
  } catch (error) {
    console.log('writeUserToDb error ======== >>>>>> ', error);
  }
};

// const getSubscribersFromDb = async () => {
//   const userRef = db.collection(collection).doc('countSubscriber');
//   const doc = await userRef.get();

//   if (!doc.exists) {
//     console.log('No such document!');
//   } else {
//     return doc.data();
//   }
// };

module.exports = {
  writeToDb,
  writeUserToDb,
};
