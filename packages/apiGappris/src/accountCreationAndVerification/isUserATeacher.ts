import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/auth';
import AuthLevel from '../models/user/AuthLevel';

const isUserATeacher = https.onCall(async (_data, ctx) => {
  if (ctx.auth === undefined) {
    // eslint-disable-next-line max-len
    throw new HttpsError('unauthenticated', 'The call to isUserATeacher did not include a valid Firebase Auth ID token');
  } else {
    const userUID: string = ctx.auth?.uid;
    // eslint-disable-next-line max-len
    const userData = (await firestore().collection('Users').doc(userUID).get()).data();
    if (userData !== undefined) {
      return userData.authLevel === AuthLevel.TEACHER;
    }
    // eslint-disable-next-line max-len
    throw new HttpsError('not-found', 'The specified UID did not match any Users document in Firestore');
  }
});

export default isUserATeacher;
