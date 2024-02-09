// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.

// The Firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
import * as firebaseAdmin from "firebase-admin";
import {
  deadhangBodyWeightGripData,
  deadhangFourPlateGripData,
  deadhangOnePlateGripData,
  deadhangThreePlateGripData,
  deadhangTwoPlateGripData,
  wideDeepPinchGripData,
  wideShallowPinchGripData,
} from "./data/grip/gripData";
import {
  deadhangBodyWeightChallenge,
  deadhangFourPlateChallenge,
  deadhangOnePlateChallenge,
  deadhangThreePlateChallenge,
  deadhangTwoPlateChallenge,
  pinchWideDeepTenSecondsChallenge,
  pinchWideShallowTenSecondsChallenge,
} from "./data/challenge/challengeData";

initializeApp();

/*** Challenges ***/
export { default as saveChallengeProgress } from "./challenge/saveChallengeProgress";
export { default as getAllChallenges } from "./challenge/getAllChallenges";
export { default as getFilteredChallenges } from "./challenge/getFilteredChallenges";

/*** Grips ***/
export { default as getAllGrips } from "./grip/getAllGrips";
export { default as getFilteredGrips } from "./grip/getFilteredGrips";

/*** Users ***/
export { default as getUser } from "./users/getUser";
export { default as createUserOnFirestore } from "./users/createUserOnFirestore";
export { default as deleteUserOnFirestore } from "./users/deleteUserOnFirestore";

/*** Progress ***/
export { default as getChallengeProgress } from "./progress/getChallengeProgress";
export { default as getUserChallengeProgresses } from "./progress/getUserChallengeProgresses";

/*** Initialize Data ***/

const db = firebaseAdmin.firestore();

const gripData = [
  wideShallowPinchGripData,
  wideDeepPinchGripData,
  deadhangBodyWeightGripData,
  deadhangOnePlateGripData,
  deadhangTwoPlateGripData,
  deadhangThreePlateGripData,
  deadhangFourPlateGripData,
];

for (const data of gripData) {
  db.collection("Grips").doc(data.id).set(data);
}

const challengeData = [
  deadhangBodyWeightChallenge,
  deadhangOnePlateChallenge,
  deadhangTwoPlateChallenge,
  deadhangThreePlateChallenge,
  deadhangFourPlateChallenge,
  pinchWideShallowTenSecondsChallenge,
  pinchWideDeepTenSecondsChallenge
];

for (const data of challengeData) {
  db.collection("Challenges").doc(data.id).set(data);
}
