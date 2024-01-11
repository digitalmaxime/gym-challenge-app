/* eslint-disable @typescript-eslint/no-explicit-any */
import admin, { firestore } from 'firebase-admin';
import { https } from 'firebase-functions';
import { HttpsError } from 'firebase-functions/v1/auth';
import AuthLevel from '../models/user/AuthLevel';


const adminDeleteUser = https.onCall(async (data, ctx) => {
  if (ctx.auth?.uid === undefined) {
    throw new HttpsError('invalid-argument', 'UserId was not provided');
  }
  const usersToDel = data.selectedUsers as
  {email: string, authLevel: AuthLevel} [];

  const usersDoc = await firestore().collection('Users').get();
  const auth = admin.auth();

  for (const userToDel of usersToDel) {
    const findEmail = (user:any) =>
      user.data().email === userToDel.email;
    const uDoc = usersDoc.docs.find(findEmail);
    if ( uDoc !== undefined ) {
      await auth.deleteUser(uDoc.id);
    }
  }
  return await new Promise(r => setTimeout(r, 1500));
});

export default adminDeleteUser;
