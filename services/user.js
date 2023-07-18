const { Timestamp } = require('@google-cloud/firestore');
const { db } = require('../config/firestore');

const writeToDb = async data => {
  const uniqueId = Date.now().toString();

  const userRef = db
    .collection('users')
    .doc(data.userId)
    .collection('messages')
    .doc(uniqueId);

  try {
    const res = await userRef.set({
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const readFromDb = async () => {
  const snapshot = await db.collection('users').get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
};

module.exports = {
  writeToDb,
  readFromDb,
};
