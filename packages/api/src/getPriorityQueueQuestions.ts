/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/https';
import { calculatePriority, millisInADay } from './utilityFunctions/priorityQueueUtilities';
import { PriorityQueueQuestion } from './models/course/question/Question';


// Function used to return 2 questions from the queue to
// supplement lesson
// Data must contain the following field(s):
// courseId: The courseId of the course from which the lesson originates
const getPriorityQueueQuestions = https.onCall(async (data, ctx) => {
  if (ctx.auth?.uid === undefined) {
    throw new HttpsError('invalid-argument', 'UserId was not provided');
  }
  if (data.courseId === undefined) {
    throw new HttpsError('invalid-argument', 'courseId was not provided');
  }

  const courseId: string = data.courseId;
  const PQDoc = await firestore().collection('Users').doc(ctx.auth?.uid).collection('PriorityQueue').doc(courseId).get();
  if (PQDoc.exists) {
    const lastUpdated: firestore.Timestamp = (PQDoc.data() as firestore.DocumentData).lastUpdated;
    const PQ: PriorityQueueQuestion[] = (PQDoc.data() as firestore.DocumentData).priorityQueue;
    // Check if the time since lastUpdate exceeds around a day,
    // and if so, recalculate the priority of all questions in the queue
    const currentTime = firestore.Timestamp.now().toDate();
    if (Math.round((currentTime.getTime() - (lastUpdated as firestore.Timestamp).toDate().getTime()) / millisInADay) > 0) {
      PQ.forEach(value => {
        value.priority = calculatePriority(value, currentTime);
      });
      // A sort is done to compensate for any potential rounding errors
      PQ.sort((a, b): number => {
        return b.priority - a.priority;
      });
      // Update priorityQueue
      PQDoc.ref.update({
        lastUpdated: currentTime,
        priorityQueue: PQ,
      });
    }
    const questionIds: string[] = [];
    // Return at most the first 2 questions
    for (let i = 0; i < 2; i++) {
      if (PQ[i] !== undefined && PQ[i].priority >= 0) {
        questionIds.push(PQ[i].id);
      }
    }
    return questionIds;
  } else {
    // If the doc does not exist
    // We return an empty list
    return [];
  }
});

export default getPriorityQueueQuestions;
