import { httpsCallable, HttpsCallableResult } from "firebase/functions";
import { firebaseFunctions } from "../utils/firebase";
import { ProgressDictionary } from "../models/challengeProgress/ProgressDictionary";
import { ChallengeModel } from "../models/challenge/ChallengeModel";
import { GripModel } from "../models/grip/GripModel";

async function saveChallengeProgress(
  challengeProgress: ChallengeProgressModel
): Promise<HttpsCallableResult<unknown>> {
  const callSaveChallengeProgress = httpsCallable(
    firebaseFunctions,
    "saveChallengeProgress"
  );
  return callSaveChallengeProgress(challengeProgress);
}

async function getAllChallenges(): Promise<HttpsCallableResult<ChallengeModel[]>> {
  const callGetAllChallenges = httpsCallable<unknown, ChallengeModel[]>(
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

async function getAllGrips(): Promise<HttpsCallableResult<GripModel[]>> {
  const callGetAllGrips = httpsCallable<unknown, GripModel[]>(firebaseFunctions, "getAllGrips");
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

async function setChallengeProgressMockData(): Promise<
  HttpsCallableResult<ProgressDictionary>
> {
  const callSetChallengeProgressMockData = httpsCallable<
    unknown,
    ProgressDictionary
  >(firebaseFunctions, "setChallengeProgressMockData");
  return callSetChallengeProgressMockData();
}

export {
  getAllChallenges,
  saveChallengeProgress,
  getFilteredChallenges,
  getAllGrips,
  getFilteredGrips,
  getCurrentUser,
  getUserChallengeProgresses,
  getChallengeProgress,

  setChallengeProgressMockData,
};
