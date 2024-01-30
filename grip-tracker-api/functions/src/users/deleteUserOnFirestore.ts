import { auth } from 'firebase-functions';
import { firestore } from 'firebase-admin';

const deleteUserOnFirestore = auth.user().onDelete(async userRecord => {
  if (userRecord.email !== undefined) {
    await firestore().collection('Users').doc(userRecord.uid).delete();
  }
});

export default deleteUserOnFirestore;
