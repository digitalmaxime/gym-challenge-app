/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/https';
import { userHasProperAuthLevel } from './utilityFunctions/userHasProperAuthenticationLevel';
import AuthLevel from './models/user/AuthLevel';

const getAllPendingUsers = https.onCall(async (data, ctx) => {
  const userId = ctx.auth?.uid as string;
  if (userId === undefined) {
    throw new HttpsError('invalid-argument', 'userId was not provided');
  }
  await userHasProperAuthLevel(userId, AuthLevel.ADMIN);

  const pendingUserList: {email: string, authLevel: AuthLevel}[] = [];

  const collection = await firestore().collection('PendingUsers').get();
  collection.docs.forEach( value => {
    pendingUserList.push({
      email: value.data().email,
      authLevel: value.data().authLevel,
    });
  });

  return pendingUserList;
});

export default getAllPendingUsers;
