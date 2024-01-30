import {
  httpsCallable,
  HttpsCallableResult,
} from 'firebase/functions';
import { firebaseFunctions } from '../utils/firebase';

async function createChallenge(): Promise<HttpsCallableResult<unknown>> {
  const callCreateChallenge = httpsCallable(
    firebaseFunctions,
    'createChallenge',
    { timeout: 2000 },
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
    userId,
    challengeId,
    weight,
    duration,
  });
}

async function getAllGrips(): Promise<HttpsCallableResult<unknown>> {
  const callGetAllGrips = httpsCallable(
    firebaseFunctions,
    'getAllGrips',
  );
  return callGetAllGrips();
}

async function getFilteredGrips(gripType: string): Promise<HttpsCallableResult<unknown>> {
  const callGetFilteredGrips = httpsCallable(
    firebaseFunctions,
    'getFilteredGrips',
  );
  return callGetFilteredGrips({gripType});
}
async function getUserById(
  userId: string,
): Promise<HttpsCallableResult<unknown>> {
  const callGetUserById = httpsCallable(firebaseFunctions, 'getUserByIdMobile');
  return callGetUserById({ userId });
}

export {
  createChallenge,
  saveChallengeResult,
  getAllGrips,
  getFilteredGrips,

  getUserById,
};
