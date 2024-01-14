/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/https';

const getUserFollowedCourses = https.onCall(async data => {
  const userId : string = data.userId;
  if (!userId) {
    throw new HttpsError('invalid-argument', 'User id provided is undefined..');
  }

  const followedCoursesId: string[] = [];
  const progressCollection = await firestore().collection('Users').doc(userId).collection('Progress')?.listDocuments();
  if (!progressCollection) {
    return [];
  }

  if (progressCollection.length > 0) {
    progressCollection.forEach(doc => {
      followedCoursesId.push(doc.id);
    });
  }

  return (followedCoursesId);
},
);

export default getUserFollowedCourses;
