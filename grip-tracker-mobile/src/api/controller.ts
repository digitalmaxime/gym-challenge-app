import { httpsCallable, HttpsCallableResult } from "firebase/functions";
import { firebaseFunctions } from "../utils/firebase";
import { ProgressDictionary } from "../models/challengeProgress/progressDictionary";

async function createChallenge(): Promise<HttpsCallableResult<unknown>> {
  const callCreateChallenge = httpsCallable(
    firebaseFunctions,
    "createChallenge",
    { timeout: 2000 }
  );
  return callCreateChallenge({});
}

async function saveChallengeProgress(
  challengeProgress: ChallengeProgressModel
): Promise<HttpsCallableResult<unknown>> {
  const callSaveChallengeProgress = httpsCallable(
    firebaseFunctions,
    "saveChallengeProgress"
  );
  return callSaveChallengeProgress(challengeProgress);
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

async function getCurrentUser(): Promise<HttpsCallableResult<unknown>> {
  const callGetUser = httpsCallable(firebaseFunctions, "getUser");
  return callGetUser();
}

async function getChallengeProgress(
  userId: string,
  gripType: string,
  subGripType: string
): Promise<HttpsCallableResult<ChallengeProgressModel[]>> {
  const callGetChallengeProgress = httpsCallable<
    unknown,
    ChallengeProgressModel[]
  >(firebaseFunctions, "getChallengeProgress");
  return callGetChallengeProgress({ userId, gripType, subGripType });
}

async function getUserChallengeProgresses(): Promise<
  HttpsCallableResult<ProgressDictionary>
> {
  const callGetUserChallengeProgresses = httpsCallable<
    unknown,
    ProgressDictionary
  >(firebaseFunctions, "getUserChallengeProgresses");
  return callGetUserChallengeProgresses();
}

export {
  createChallenge,
  getAllChallenges,
  saveChallengeProgress,
  getFilteredChallenges,
  getAllGrips,
  getFilteredGrips,
  getCurrentUser,
  getUserChallengeProgresses,
  getChallengeProgress,
};
