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
    {timeout: 2000}
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

async function getAllGrips(): Promise<HttpsCallableResult<unknown>> {
  const getAllGrips = httpsCallable(
    firebaseFunctions,
    'getAllGrips',
  );
  return getAllGrips();
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
  getAllGrips,

  getCourseById,
  getUserCourseProgress,
  getUserFollowedCoursesIds,
  getUserById,
  deleteUser,
};
