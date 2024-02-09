import { onCall } from "firebase-functions/v2/https";
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/https';
import UserModel from '../models/user/UserModel';

const getUser = onCall(async request => {
  const uid = request.auth?.uid;
  const token = request.auth?.token || null;
  const email = request.auth?.token.email || null;

  if (uid == undefined) {
    throw new HttpsError('unauthenticated', `uid undefined`);
  }

  console.log("uid: ", uid);
  console.log("token: ", token);
  console.log("email: ", email);
  
  const docRef = firestore().collection('Users').doc(uid);
  const fetchedUser = await docRef.get();
  const userData = fetchedUser.data();
  if (userData == undefined) {
    throw new HttpsError('not-found', `User ${uid} not found`);
  } else {
    const user: UserModel = {
      email: userData.email,
      authLevel: userData.authLevel,
    };

    console.log(user)
    return user;
  }
});

export default getUser;
