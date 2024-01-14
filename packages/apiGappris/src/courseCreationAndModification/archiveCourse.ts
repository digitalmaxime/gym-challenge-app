/* eslint-disable max-len */
import { https } from 'firebase-functions';

import { firestore } from 'firebase-admin';
import { userHasProperAuthLevel } from '../utilityFunctions/userHasProperAuthenticationLevel';
import AuthLevel from '../models/user/AuthLevel';

const archiveCourse = https.onCall(
  async (data, ctx) => {
    await userHasProperAuthLevel(ctx.auth?.uid as string, AuthLevel.TEACHER);
    // Data contains the id of the document

    const courseId: string = data.courseId;
    const docRef = firestore().collection('Courses').doc(courseId);
    await docRef.set({
      publishedSections: null,
    }, { merge: true });
  },
);

export default archiveCourse;
