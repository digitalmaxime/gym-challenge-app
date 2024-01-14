/* eslint-disable max-len */
import { https } from 'firebase-functions';

import { firestore } from 'firebase-admin';
import { userHasProperAuthLevel } from '../utilityFunctions/userHasProperAuthenticationLevel';
import AuthLevel from '../models/user/AuthLevel';
const deleteCourse = https.onCall(
  async (data, ctx) => {
    await userHasProperAuthLevel(ctx.auth?.uid as string, AuthLevel.TEACHER);
    // Data contains the id of the document
    // TODO VERIFIER QUE C'EST BON
    const courseId: string = data.courseId;
    const courseRef = firestore().collection('Courses').doc(courseId);
    await firestore().recursiveDelete(courseRef);
  },
);

export default deleteCourse;
