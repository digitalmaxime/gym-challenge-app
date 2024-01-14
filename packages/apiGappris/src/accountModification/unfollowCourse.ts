/* eslint-disable max-len */
import { https } from 'firebase-functions';
// import { Request, Response, https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/auth';
import { EventAnalytics, EventType } from '../mocks/getDummyAnalytics';

const removeCourseFromFollowedCourses = https.onCall(async (data, ctx) => {
  const userId : string = data.userId;
  const courseId : string = data.courseId;
  if (userId === undefined || courseId === undefined) {
    throw new HttpsError('invalid-argument', 'User id or course id provided is undefined..');
  }
  // Add event to analytics showing that a user left a course
  const analyticsEvent: EventAnalytics = {
    useremail: ctx.auth?.token.email as string,
    type: EventType.COURSE,
    objectId: courseId,
    status: false,
    timestamp: firestore.Timestamp.now().toDate().getTime(),
  };
  firestore().collection('Courses').doc(courseId).collection('Analytics').add(analyticsEvent);

  await firestore().collection('Users').doc(userId).collection('Progress').doc(courseId).delete();
  firestore().collection('Users').doc(userId).collection('PriorityQueue').doc(courseId).delete();
  firestore().collection('Users').doc(userId).collection('FailedQuestions').doc(courseId).delete();
});

export default removeCourseFromFollowedCourses;
