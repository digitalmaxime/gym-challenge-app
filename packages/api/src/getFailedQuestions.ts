/* eslint-disable max-len */
import { https } from 'firebase-functions';

import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/https';

const returnFailedQuestionsIds = https.onCall(async (data, ctx) => {
  if (ctx.auth?.uid === undefined) {
    throw new HttpsError('invalid-argument', 'UserId was not provided');
  }
  if (data.courseId === undefined) {
    throw new HttpsError('invalid-argument', 'courseId was not provided');
  }
  const userId = ctx.auth?.uid;
  const courseId: string = data.courseId;
  const FQDoc = await firestore().collection('Users').doc(userId).collection('FailedQuestions').doc(courseId).get();
  if (FQDoc.exists) {
    const FQ: {[id: string]: string}[] = (FQDoc.data() as firestore.DocumentData).failedQuestions;
    const listOfIds: string[] = [];
    FQ.forEach(obj => {
      listOfIds.push(obj.id);
    });
    return listOfIds;
  } else {
    throw new HttpsError('not-found', 'The provided courseId did not match any FailedQuestions document');
  }
});

export default returnFailedQuestionsIds;
