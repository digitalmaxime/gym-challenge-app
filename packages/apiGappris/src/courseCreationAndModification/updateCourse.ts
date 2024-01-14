/* eslint-disable max-len */
import { https } from 'firebase-functions';

import { firestore } from 'firebase-admin';
import { userHasProperAuthLevel } from '../utilityFunctions/userHasProperAuthenticationLevel';
import { HttpsError } from 'firebase-functions/v1/https';

const updateCourse = https.onCall(
  async (data, ctx) => {
    await userHasProperAuthLevel(ctx.auth?.uid as string, 1);
    // Data contains both the id of the document, as well as the doc content
    data = data.currentCourse;
    const courseId: string = data.id;
    const docRef = firestore().collection('Courses').doc(courseId);
    docRef.update({
      contributors: data.contributors,
      courseNumber: data.courseNumber,
      courseTitle: data.courseTitle,
      details: data.details,
      imageUrl: data.imageUrl,
      password: data.password,
      savedSections: data.savedSections,
      tags: data.tags,
    }).then(() => {
      return;
    }).catch(() => {
      // Triggered if the update fails
      throw new HttpsError('not-found', 'The course does not exist');
    });
  },
);

export default updateCourse;
