/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/auth';
import AuthLevel from '../models/user/AuthLevel';

const upgradeUserToTeacher = https.onCall(async data => {
  // TODO: Add check to see if triggering user is an admin

  const userUID: string = data.uid;
  const userDoc = await firestore().collection('Users').doc(userUID).get();
  if (!userDoc.exists) {
    throw new HttpsError('not-found', 'The specified UID does not match any Users document in Firestore');
  } else {
    await userDoc.ref.update({ authLevel: AuthLevel.TEACHER });
  }
});

export default upgradeUserToTeacher;
