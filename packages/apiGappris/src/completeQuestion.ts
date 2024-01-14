/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/https';
import { FailedQuestion, PriorityQueueQuestion } from './models/course/question/Question';
import { addElementToQueue, calculatePriority } from './utilityFunctions/priorityQueueUtilities';
import { EventAnalytics, EventType } from './mocks/getDummyAnalytics';


// Function called whenever a question is completed during a lesson (not a control point)
// and during failed questions sessions.
// The expected fields for data are:
// courseId, identifying the course
// questionId, which contains the concatenated ids from section,unit,lesson,question
// isFailed, boolean which determines if the question was completed succesfully or not
const completeQuestion = https.onCall(async (data, ctx) => {
  if (ctx.auth?.uid === undefined) {
    throw new HttpsError('invalid-argument', 'UserId was not provided');
  }
  if (data.questionId === undefined) {
    throw new HttpsError('invalid-argument', 'questionId was not provided');
  }
  if (data.courseId === undefined) {
    throw new HttpsError('invalid-argument', 'courseId was not provided');
  }
  if (data.isFailed === undefined) {
    throw new HttpsError('invalid-argument', 'isFailed was not provided');
  }
  const userId: string = ctx.auth.uid;

  const analyticsEvent: EventAnalytics = {
    useremail: ctx.auth.token.email as string,
    type: EventType.QUESTION,
    objectId: data.questionId,
    status: !(data.isFailed as boolean),
    timestamp: firestore.Timestamp.now().toDate().getTime(),
  };
  firestore().collection('Courses').doc(data.courseId as string).collection('Analytics').add(analyticsEvent);
  // Add add or update entry in PriorityQueue
  const PQDoc = await firestore().collection('Users').doc(userId).collection('PriorityQueue').doc(data.courseId as string).get();
  // If the document exists, we can query it to get the priority queue and update/add an entry
  if (PQDoc.exists) {
    const priorityQueue: PriorityQueueQuestion[] = (PQDoc.data() as firestore.DocumentData).priorityQueue;
    // Iterate over queue to find if the question already exists
    let questionExists = false;
    let questionIndex = 0;
    priorityQueue.forEach( (value, index) => {
      if (value.id === data.questionId) {
        questionExists = true;
        questionIndex = index;
      }
    });
    if (questionExists) {
      // If it does, we remove the element from the array
      const question: PriorityQueueQuestion = priorityQueue.splice(questionIndex, 1)[0];
      // Update its spacingExponentialFactor (Reset to 1 on failure, increment on success)
      question.spacingExponentialFactor = (data.isFailed) ? 1 : question.spacingExponentialFactor + 1;
      // Update its lastCompleted Date
      question.lastCompleted = firestore.Timestamp.now();
      // Calculate its new priority
      question.priority = calculatePriority(question, firestore.Timestamp.now().toDate());
      // Insert it back into the array
      addElementToQueue(question, priorityQueue);
    } else {
      // If it does not, we add a new entry inside the array
      const question: PriorityQueueQuestion = {
        id: data.questionId,
        spacingExponentialFactor: 1,
        lastCompleted: firestore.Timestamp.now(),
        priority: -1,
      };
      addElementToQueue(question, priorityQueue);
    }
    await firestore().collection('Users').doc(userId).collection('PriorityQueue').doc(data.courseId as string).update({
      lastUpdated: firestore.Timestamp.now(),
      priorityQueue: priorityQueue,
    });
  } else {
    const priorityQueue: PriorityQueueQuestion[] = [];
    priorityQueue.push({
      id: data.questionId,
      spacingExponentialFactor: 1,
      lastCompleted: firestore.Timestamp.now(),
      priority: -1,
    });
    // If it does not exist, we need to create it
    await firestore().collection('Users').doc(userId).collection('PriorityQueue').doc(data.courseId as string).set({
      lastUpdated: firestore.Timestamp.now(),
      priorityQueue: priorityQueue,
    });
  }

  if (data.isFailed) {
    const FQDoc = await firestore().collection('Users').doc(userId).collection('FailedQuestions').doc(data.courseId as string).get();
    // If the document exists, check if the failed question is already in the list
    // if it isn't, add it
    if (FQDoc.exists) {
      FQDoc.ref.update({
        failedQuestions: firestore.FieldValue.arrayUnion({ id: data.questionId }),
      });
    } else {
      const FQ: FailedQuestion[] = [];
      FQ.push({ id: data.questionId });
      // If the doc doesn't exist yet, create it and set an array with the failed question in
      FQDoc.ref.create({ failedQuestions: FQ });
    }
  }
});

export default completeQuestion;
