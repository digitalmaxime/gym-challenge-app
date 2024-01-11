/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import { PriorityQueueQuestion } from '../models/course/question/Question';
import { firestore } from 'firebase-admin';

// You can change this variable to a lower number temporarily if you
// need to test functionalities related to the priorityQueue quickly
export const millisInADay = 86400000;
// export const millisInADay = 60000;

export function addElementToQueue(element: PriorityQueueQuestion, queue: PriorityQueueQuestion[]) {
  queue.push(element);
  queue.sort((a, b): number => {
    return b.priority - a.priority;
  });
}
// Calculates the priority of a question using the formula:
// priority = (currentDate - (lastCompleted + n^2Days))
// where priority represents the difference in days
export function calculatePriority(question: PriorityQueueQuestion, currentTime: Date): number {
  const expectedDateAsMillis = (question.lastCompleted as firestore.Timestamp).toDate().getTime() +
  Math.pow(question.spacingExponentialFactor, 2) * millisInADay;
  return Math.round((currentTime.getTime() - expectedDateAsMillis) / millisInADay);
}
