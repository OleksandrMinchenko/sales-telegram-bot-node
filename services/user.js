// https://cloud.google.com/firestore/docs/create-database-server-client-library?_ga=2.122427979.-1971520172.1684677818
// https://cloud.google.com/firestore/docs/query-data/queries

const { Timestamp } = require('@google-cloud/firestore');
const { db } = require('../config/firestore');
const { dateConverter } = require('../helpers/dateConverter');

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
    // console.log(_writeTime._seconds);
    // console.log(dateConverter(_writeTime._seconds))

    return _writeTime;
  } catch (error) {
    console.log('writeToDb error ======== >>>>>> ', error);
    return error;
  }
};

const readFromDb = async () => {
  console.log('get data');

  const snapshot = await db.collection('messages').get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
  // ===============
  //   const doc = db.collection('messages').doc('111');

  //   const observer = doc.onSnapshot(
  //     docSnapshot => {
  //       console.log(`Received doc snapshot: ${docSnapshot}`);
  //       // ...
  //       return docSnapshot;
  //     },
  //     err => {
  //       console.log(`Encountered error: ${err}`);
  //     }
  //   );

  //   console.log(observer);
  // =======================
  //   const sfRef = db.collection('users').doc('111');
  //   const collections = await sfRef.listCollections();
  //   collections.forEach(collection => {
  //     console.log(collection);
  //     console.log('Found subcollection with id:', collection.id);
  //   });
};

module.exports = {
  writeToDb,
  readFromDb,
};
