import { auth } from 'firebase-functions';
import admin, { firestore } from 'firebase-admin';
import AuthLevel from '../models/user/AuthLevel';
const db = admin.firestore();


const deleteUserOnFirestore = auth.user().onDelete(async userRecord => {
  const userRef = db.collection('Users').doc(userRecord.uid);
  const pendingRef = db.collection('PendingUsers').doc(userRecord.uid);
  const userDoc = await userRef.get();

  // Make additional changes if the user is a teacher/admin
  // Remove Teacher in contributors array
  if (userDoc.data()?.authLevel > AuthLevel.STUDENT) {
    // eslint-disable-next-line max-len
    const listOfCoursesToUpdate = await db.collection('Courses').where('contributors', 'array-contains', userRecord.uid).get();
    for (const doc of listOfCoursesToUpdate.docs) {
      await doc.ref.update({
        collaborators: firestore.FieldValue.arrayRemove(userRecord.uid),
      });
    }
  }
  await pendingRef.delete();

  // Recursively delete the user document and its subcollections
  await db.recursiveDelete(userRef);
});
export default deleteUserOnFirestore;
