/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/auth';
import MobileCourse from './models/course/mobileCourse';

const getCourseMobile = https.onCall(async (data, ctx) => {
  const userUID = ctx.auth?.uid as string;
  const courseId: string = data.courseId as string;
  if (courseId === null || courseId === undefined) {
    throw new HttpsError('not-found', 'Course id was not provided..');
  }
  const courseDoc = await firestore().collection('Courses').doc(courseId).get();
  if (courseDoc.exists) {
    const data = courseDoc.data() as firestore.DocumentData;
    if (data.publishedSections !== null) {
      const courseContent: MobileCourse = {
        id: courseId,
        courseNumber: data.courseNumber,
        sections: data.publishedSections,
      };
      return courseContent;
    }
    // User should not be following this course, so we remove it from his courses
    // Only progress needs to be completed by the time we send the response, as the next
    // check for followed courses will not include the removed course
    await firestore().collection('Users').doc(userUID).collection('Progress').doc(courseId).delete();
    firestore().collection('Users').doc(userUID).collection('PriorityQueue').doc(courseId).delete();
    firestore().collection('Users').doc(userUID).collection('FailedQuestions').doc(courseId).delete();
    throw new HttpsError('unavailable', 'The specified course is not published and is therefore unavailable');
  } else {
    throw new HttpsError('not-found', 'The specified courseID did not match any Course document in Firestore');
  }
});

export default getCourseMobile;
