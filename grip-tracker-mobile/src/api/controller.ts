import { httpsCallable, HttpsCallableResult } from "firebase/functions";
import { firebaseFunctions } from "../utils/firebase";

async function createChallenge(): Promise<HttpsCallableResult<unknown>> {
  const callCreateChallenge = httpsCallable(
    firebaseFunctions,
    "createChallenge",
    { timeout: 2000 }
  );
  return callCreateChallenge({});
}

async function saveChallengeResult(
  userId: string,
  challengeId: string,
  weight: number,
  duration: number
): Promise<HttpsCallableResult<unknown>> {
  const callCreateChallenge = httpsCallable(
    firebaseFunctions,
    "saveChallengeProgress"
  );
  return callCreateChallenge({
    userId,
    challengeId,
    weight,
    duration,
  });
}

async function getAllChallenges(): Promise<HttpsCallableResult<unknown>> {
  const callGetAllChallenges = httpsCallable(
    firebaseFunctions,
    "getAllChallenges"
  );
  return callGetAllChallenges();
}

async function getFilteredChallenges(
  gripType: string
): Promise<HttpsCallableResult<unknown>> {
  const callGetFilteredChallenges = httpsCallable(
    firebaseFunctions,
    "getFilteredChallenges"
  );
  return callGetFilteredChallenges({ gripType });
}

async function getAllGrips(): Promise<HttpsCallableResult<unknown>> {
  const callGetAllGrips = httpsCallable(firebaseFunctions, "getAllGrips");
  return callGetAllGrips();
}

async function getFilteredGrips(
  gripType: string
): Promise<HttpsCallableResult<unknown>> {
  const callGetFilteredGrips = httpsCallable(
    firebaseFunctions,
    "getFilteredGrips"
  );
  return callGetFilteredGrips({ gripType });
}

async function getUserById(
  userId: string
): Promise<HttpsCallableResult<unknown>> {
  const callGetUserById = httpsCallable(firebaseFunctions, "getUserByIdMobile");
  return callGetUserById({ userId });
}

async function getChallengeProgress(
  userId: string,
  gripType: string,
  subGripType: string
): Promise<HttpsCallableResult<ChallengeProgressModel[]>> {
  const callGetChallengeProgress = httpsCallable<unknown, ChallengeProgressModel[]>(firebaseFunctions, "getChallengeProgress");
  return callGetChallengeProgress({ userId, gripType, subGripType });
}

export {
  createChallenge,
  getAllChallenges,
  getFilteredChallenges,
  saveChallengeResult,
  getAllGrips,
  getFilteredGrips,
  getUserById,

  getChallengeProgress,
};
