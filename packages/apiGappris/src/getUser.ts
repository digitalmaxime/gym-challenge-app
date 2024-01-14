import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import UserModel from './models/user/UserModel';
import { HttpsError } from 'firebase-functions/v1/https';

const getUserByIdMobile = https.onCall(async data => {
  const userId : string = data.userId;
  if (!userId) {
    throw new HttpsError('invalid-argument', 'User id provided is undefined..');
  }
  const docRef = firestore().collection('Users').doc(userId);
  const fetchedUser = await docRef.get();
  const userData = fetchedUser.data();
  if (userData == undefined) {
    throw new HttpsError('not-found', `User ${userId} not found`);
  } else {
    const user: UserModel = {
      id: fetchedUser.id,
      email: userData.email,
      authLevel: userData.authLevel,
    };

    return user;
  }
});

export default getUserByIdMobile;
