/* eslint-disable max-len */
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/auth';
import AuthLevel from '../models/user/AuthLevel';

// Utility function meant to be used whenever a function requires the user to be a specific authLevel
// to access a cloud function. This function should be called in all cloud functions meant for Teachers and Admins.
const userHasProperAuthLevel = async function(userUID: string, expectedAuthLevel: AuthLevel) {
  // Find user in DB
  const user = await firestore().collection('Users').doc(userUID).get();
  if (!user.exists) {
    throw new HttpsError('not-found', 'The specified UID did not match any Users document in Firestore');
  } else {
    // Get user's authLevel in DB
    const data = user.data() as firestore.DocumentData;
    const authLevel: AuthLevel = data.authLevel as AuthLevel;
    // Check if authLevel in DB is at or higher than expected
    if (authLevel < expectedAuthLevel) {
      // Throw exception if not
      throw new HttpsError('permission-denied', 'This account does not have the required AuthLevel to access this cloud function');
    }
  }
};

export { userHasProperAuthLevel };
