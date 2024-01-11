/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import AuthLevel from '../models/user/AuthLevel';
import { HttpsError } from 'firebase-functions/v1/auth';


// Function called when a user is created or tries to login to the web interface
// Without the proper auth level, notifying the Admin
// that an account may be asking to be added as a Teacher
const addToAdminList = https.onCall(async (data, ctx) => {
  const userId = ctx.auth?.uid;
  if (userId === undefined) {
    throw new HttpsError('invalid-argument', 'invalid UID');
  }
  // Get user's authLevel
  const userDoc = await firestore().collection('Users').doc(userId).get();
  if (userDoc.exists) {
    const authLevel: AuthLevel = (userDoc.data() as firestore.DocumentData).authLevel;
    const email: string = ctx.auth?.token.email as string;
    await firestore().collection('PendingUsers').doc(userId).create({
      email: email,
      authLevel: authLevel,
    });
  } else {
    throw new HttpsError('not-found', 'User not found');
  }
});

export default addToAdminList;
