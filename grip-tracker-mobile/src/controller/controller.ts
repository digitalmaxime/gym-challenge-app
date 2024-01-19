import {
  getFunctions,
  httpsCallable,
  HttpsCallableResult,
} from 'firebase/functions';
import { firebaseFunctions } from '../utils/firebase';

/* eslint-disable max-len */
// const functions = getFunctions();
// const addMessage = httpsCallable(functions, 'addmessage');
// async function addMessageFunction(): Promise<void> {
//   addMessage({ text: "messageText" })
//   .then((result) => {
//     // Read result of the Cloud Function.
//     /** @type {any} */
//     const data = result.data;
//     const sanitizedMessage = "messageText";
//   });
// }

async function createChallenge(): Promise<HttpsCallableResult<unknown>> {
  const callCreateChallenge = httpsCallable(
    firebaseFunctions,
    'createChallenge',
  );
  return callCreateChallenge({});
}

async function saveChallengeResult(
  userId: string,
  challengeId: string,
  weight: number,
  duration: number,
): Promise<HttpsCallableResult<unknown>> {
  const callCreateChallenge = httpsCallable(
    firebaseFunctions,
    'saveChallengeProgress',
  );
  return callCreateChallenge({
    userId: userId,
    challengeId: challengeId,
    weight: weight,
    duration: duration
  });
}

async function getAllCoursesPreview(): Promise<HttpsCallableResult<unknown>> {
  const callGetAllCoursesPreview = httpsCallable(
    firebaseFunctions,
    'getAllCoursesPreview',
  );
  return callGetAllCoursesPreview({});
}

async function getCourseById(
  courseId: string,
): Promise<HttpsCallableResult<unknown>> {
  const callGetCourseById = httpsCallable(firebaseFunctions, 'getCourseMobile');
  return callGetCourseById({ courseId });
}

function getUserCourseProgress(
  userId: string,
  courseId: string,
): Promise<HttpsCallableResult<unknown>> {
  const callGetUserCourseProgress = httpsCallable(
    firebaseFunctions,
    'getCourseProgress',
  );
  return callGetUserCourseProgress({ userId, courseId });
}

async function getUserFollowedCoursesIds(
  userId: string,
): Promise<HttpsCallableResult<unknown>> {
  const callGetUserFollowedCoursesIds = httpsCallable(
    firebaseFunctions,
    'getUserFollowedCourses',
  );
  return callGetUserFollowedCoursesIds({ userId });
}

async function getUserById(
  userId: string,
): Promise<HttpsCallableResult<unknown>> {
  const callGetUserById = httpsCallable(firebaseFunctions, 'getUserByIdMobile');
  return callGetUserById({ userId });
}

function deleteUser(userId: any) {
  const callDeleteUser = httpsCallable(firebaseFunctions, 'deleteUser');
  callDeleteUser({ userId });
}

export {
  // addMessageFunction,
  createChallenge,
  saveChallengeResult,
  getAllCoursesPreview,
  getCourseById,
  getUserCourseProgress,
  getUserFollowedCoursesIds,
  getUserById,
  deleteUser,
};
