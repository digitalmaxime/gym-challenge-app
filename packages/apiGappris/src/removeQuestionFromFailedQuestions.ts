/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/https';

// TODO: add comments
const removeQuestionFromFailedQuestions = https.onCall(async (data, ctx) => {
  if (ctx.auth?.uid === undefined) {
    throw new HttpsError('invalid-argument', 'UserId was not provided');
  }
  if (data.questionId === undefined) {
    throw new HttpsError('invalid-argument', 'questionId was not provided');
  }
  if (data.courseId === undefined) {
    throw new HttpsError('invalid-argument', 'courseId was not provided');
  }

  const userId: string = ctx.auth.uid;
  const FQDoc = await firestore().collection('Users').doc(userId).collection('FailedQuestions').doc(data.courseId as string).get();
  if (FQDoc.exists) {
    FQDoc.ref.update({
      failedQuestions: firestore.FieldValue.arrayRemove({ id: data.questionId }),
    });
  }
});

export default removeQuestionFromFailedQuestions;
