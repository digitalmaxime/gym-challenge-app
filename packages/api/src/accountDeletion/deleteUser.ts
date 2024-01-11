import admin from 'firebase-admin';
import { https } from 'firebase-functions';
import { HttpsError } from 'firebase-functions/v1/auth';


const deleteUser = https.onCall(async (data, ctx) => {
  if (ctx.auth?.uid === undefined) {
    throw new HttpsError('invalid-argument', 'UserId was not provided');
  }

  const auth = admin.auth();
  auth.deleteUser(ctx.auth.uid);
});

export default deleteUser;
