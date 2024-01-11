/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/https';
import { PriorityQueueQuestion } from './models/course/question/Question';

// This function removes a question from a user's priority queue
// This function should only be called from Mobile when it fails to find a question
// that was given from the getPriorityQueueQuestions Cloud Function
// This function expects 2 fields:
// questionId: The Id of the question which must be removed
// courseId: The Id of the course where the question exists
const deleteQuestionFromPQ = https.onCall(async (data, ctx) => {
  if (ctx.auth?.uid === undefined) {
    throw new HttpsError('invalid-argument', 'UserId was not provided');
  }
  if (data.questionId === undefined) {
    throw new HttpsError('invalid-argument', 'QuestionId was not provided');
  }
  if (data.courseId === undefined) {
    throw new HttpsError('invalid-argument', 'CourseId was not provided');
  }
  const userId = ctx.auth?.uid;
  const questionId: string = data.questionId as string;
  const courseId: string = data.courseId as string;

  // Retrieve the specific PQ of the user
  const PQDoc = await firestore().collection('Users').doc(userId).collection('PriorityQueue').doc(courseId).get();
  if (PQDoc.exists) {
    const priorityQueue: PriorityQueueQuestion[] = (PQDoc.data() as firestore.DocumentData).priorityQueue;
    // Find the question
    for (let i = 0; i < priorityQueue.length; i++) {
      if (priorityQueue[i].id === questionId) {
        priorityQueue.splice(i, 1);
        break;
      }
    }
    await firestore().collection('Users').doc(userId).collection('PriorityQueue').doc(courseId).update({
      priorityQueue: priorityQueue,
    });
  } else {
    throw new HttpsError('not-found', 'The specified priority queue does not exist');
  }
});

export default deleteQuestionFromPQ;
