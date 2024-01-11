/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { HttpsError } from 'firebase-functions/v1/https';
import { EventAnalytics } from './mocks/getDummyAnalytics';


// Fields required:
// courseId: The id matching the course we are trying to access
const getCourseAnalytics = https.onCall(async data => {
  if (data.courseId === undefined) {
    throw new HttpsError('invalid-argument', 'courseId was not provided');
  }
  const analyticsCollection = await firestore().collection('Courses').doc(data.courseId as string).collection('Analytics').get();

  const analyticsArray: EventAnalytics[] = [];
  analyticsCollection.docs.forEach( doc => {
    // As documents in Analytics are populated using EventAnalytics type,
    // this type conversion should not cause issue
    analyticsArray.push(doc.data() as EventAnalytics);
  });

  return analyticsArray;
});

export default getCourseAnalytics;
