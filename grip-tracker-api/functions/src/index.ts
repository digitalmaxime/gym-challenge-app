// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.

// The Firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
import * as firebaseAdmin from "firebase-admin";
import { GripModel } from "./models/grip/GripModel";
import { GripTypeEnum } from "./models/grip/GripTypeEnum";
import { SubGripTypeEnum } from "./models/grip/SubGripTypeEnum";

initializeApp();

export { default as setChallengeData } from "./data/challenge/setChallengeData";
export { default as setGripData } from "./data/grip/setGripData";
export { default as setMockUserData } from "./data/mock/setMockUser";
export { default as saveChallengeProgress } from "./challenge/saveChallengeResult";
export { default as getAllGrips } from "./grip/getAllGrips";
export { default as getFilteredGrips } from "./grip/getFilteredGrips";

/*** Initialize Data ***/

const db = firebaseAdmin.firestore();

const wideShallowPinchData: GripModel = {
  id: GripTypeEnum.Pinch + "_" + SubGripTypeEnum.wideShallow,
  gripType: GripTypeEnum.Pinch,
  subGripType: SubGripTypeEnum.wideShallow,
};

const wideDeepPinchData: GripModel = {
  id: GripTypeEnum.Pinch + "_" + SubGripTypeEnum.wideDeep,
  gripType: GripTypeEnum.Pinch,
  subGripType: SubGripTypeEnum.wideDeep,
};

const CrimpData1: GripModel = {
  id: GripTypeEnum.Crimp + "_" + SubGripTypeEnum.sixMillimeter,
  gripType: GripTypeEnum.Crimp,
  subGripType: SubGripTypeEnum.sixMillimeter,
};
const CrimpData2: GripModel = {
  id: GripTypeEnum.Crimp + "_" + SubGripTypeEnum.tenMillimeter,
  gripType: GripTypeEnum.Crimp,
  subGripType: SubGripTypeEnum.tenMillimeter,
};

db.collection("Grips").doc(wideDeepPinchData.id).set(wideDeepPinchData);
db.collection("Grips").doc(wideShallowPinchData.id).set(wideShallowPinchData);

db.collection("Grips").doc(CrimpData1.id).set(CrimpData1);
db.collection("Grips").doc(CrimpData2.id).set(CrimpData2);
