import { https } from 'firebase-functions';

import { firestore } from 'firebase-admin';

const getCourseData = https.onCall(
  async data => {
    const ref = await firestore().collection('Courses').doc(data.id).get();
    return { course: ref.data(), id: ref.id };
  },
);

export default getCourseData;
