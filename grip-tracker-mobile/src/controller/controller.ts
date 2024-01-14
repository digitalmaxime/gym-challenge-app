import { getFunctions, httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { firebaseFunctions } from '../utils/firebase';

/* eslint-disable max-len */
const functions = getFunctions();
const addMessage = httpsCallable(functions, 'addmessage');
async function addMessageFunction(): Promise<void> {
  addMessage({ text: "messageText" })
  .then((result) => {
    // Read result of the Cloud Function.
    /** @type {any} */
    const data = result.data;
    const sanitizedMessage = "messageText";
  });
}






async function createChallenge(): Promise<HttpsCallableResult<unknown>> {
  const callCreateChallenge = httpsCallable(firebaseFunctions, 'createChallenge');
  return callCreateChallenge({});
}



async function getAllCoursesPreview(): Promise<HttpsCallableResult<unknown>> {
  const callGetAllCoursesPreview = httpsCallable(firebaseFunctions, 'getAllCoursesPreview');
  return callGetAllCoursesPreview({});
}

async function getCourseById(courseId: string): Promise<HttpsCallableResult<unknown>> {
  const callGetCourseById = httpsCallable(firebaseFunctions, 'getCourseMobile');
  return callGetCourseById({ courseId });
}

function getUserCourseProgress(userId: string, courseId: string): Promise<HttpsCallableResult<unknown>> {
  const callGetUserCourseProgress = httpsCallable(firebaseFunctions, 'getCourseProgress');
  return callGetUserCourseProgress({ userId, courseId });
}

async function getUserFollowedCoursesIds(userId: string): Promise<HttpsCallableResult<unknown>> {
  const callGetUserFollowedCoursesIds = httpsCallable(firebaseFunctions, 'getUserFollowedCourses');
  return callGetUserFollowedCoursesIds({ userId });
}

async function removeCourseFromFollowedCourses(userId: string, courseId: string) {
  const callRemoveCourseFromFollowedCourses = httpsCallable(firebaseFunctions, 'removeCourseFromFollowedCourses');
  callRemoveCourseFromFollowedCourses({ userId, courseId });
}

async function followCourse(courseId: string, password: string) {
  const callFollowCourse = httpsCallable(firebaseFunctions, 'followCourse');
  return callFollowCourse({ courseId, password });
}

async function updateLessonProgress(
  userId: string,
  courseId: string,
  value: boolean,
  lessonId = '',
): Promise<HttpsCallableResult<unknown>> {
  const callUpdateProgress = httpsCallable(firebaseFunctions, 'updateLessonProgress');
  return callUpdateProgress({
    userId, courseId, value, lessonId,
  });
}

async function getUserById(userId: string): Promise<HttpsCallableResult<unknown>> {
  const callGetUserById = httpsCallable(firebaseFunctions, 'getUserByIdMobile');
  return callGetUserById({ userId });
}

async function getQuestionsFromPriorityQueue(courseId: string): Promise<HttpsCallableResult<unknown>> {
  const callGetDummyFailedQuestions = httpsCallable(firebaseFunctions, 'getPriorityQueueQuestions');
  return callGetDummyFailedQuestions({ courseId });
}

async function notifyMissingFailedQuestion(questionId: string, courseId: string) {
  const callRemoveQuestionFromFailedQuestions = httpsCallable(firebaseFunctions, 'removeQuestionFromFailedQuestions');
  callRemoveQuestionFromFailedQuestions({ questionId, courseId });
}

async function notifyMissingPriorityQuestion(questionId: string, courseId: string) {
  const callDeleteQuestionFromPQ = httpsCallable(firebaseFunctions, 'deleteQuestionFromPQ');
  callDeleteQuestionFromPQ({ questionId, courseId });
}

async function getFailedQuestionsIds(courseId: string): Promise<HttpsCallableResult<unknown>> {
  const callGetFailedQuestionsIds = httpsCallable(firebaseFunctions, 'returnFailedQuestionsIds');
  return callGetFailedQuestionsIds({ courseId });
}

function postCompleteQuestion(courseId: string | undefined, questionId: string, isFailed: boolean): void {
  if (courseId === undefined) return;

  const callPostCompleteQuestion = httpsCallable(firebaseFunctions, 'completeQuestion');
  callPostCompleteQuestion({
    courseId, questionId, isFailed,
  });
}

function removeQuestionFromFailedQuestions(courseId: string | undefined, questionId: string): void {
  if (courseId === undefined) return;

  const callPostCompleteQuestion = httpsCallable(firebaseFunctions, 'removeQuestionFromFailedQuestions');
  callPostCompleteQuestion({ courseId, questionId });
}

function deleteUser(userId: any) {
  const callDeleteUser = httpsCallable(firebaseFunctions, 'deleteUser');
  callDeleteUser({ userId });
}

export {
  addMessageFunction,
  createChallenge,
  getAllCoursesPreview,
  getCourseById,
  getUserCourseProgress,
  getUserFollowedCoursesIds,
  getUserById,
  updateLessonProgress,
  removeCourseFromFollowedCourses,
  getQuestionsFromPriorityQueue,
  notifyMissingFailedQuestion,
  notifyMissingPriorityQuestion,
  getFailedQuestionsIds,
  postCompleteQuestion,
  removeQuestionFromFailedQuestions,
  deleteUser,
  followCourse,
};
