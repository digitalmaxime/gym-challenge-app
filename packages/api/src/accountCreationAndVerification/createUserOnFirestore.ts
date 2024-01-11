import { auth } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import AuthLevel from '../models/user/AuthLevel';

const createUserOnFirestore = auth.user().onCreate(async userRecord => {
  // Create Firestore document for User
  if (userRecord.email !== undefined) {
    await firestore().collection('Users').doc(userRecord.uid).create({
      email: userRecord.email,
      authLevel: AuthLevel.STUDENT,
    });
  }
});

export default createUserOnFirestore;
