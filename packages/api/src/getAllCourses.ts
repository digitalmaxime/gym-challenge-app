import { https } from 'firebase-functions';

import { firestore } from 'firebase-admin';
import AuthLevel from './models/user/AuthLevel';

const getAllCourses = https.onCall(
  async data => {
    const ref = await firestore().collection('Courses').get();
    const courseArray: unknown[] = [];
    const user = await firestore().collection('Users').
      where('email', '==', data.email).get();
    ref.docs.forEach(doc => {
      if ( doc.data().contributors.includes(data.email) ||
       user.docs[0].data().authLevel == AuthLevel.ADMIN) {
        courseArray.push({ name: doc.data().courseTitle, id: doc.id });
      }
    });

    return courseArray;
  },
);

export default getAllCourses;
