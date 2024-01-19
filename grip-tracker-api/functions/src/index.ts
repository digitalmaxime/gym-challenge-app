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


/*** Initialize Data ***/

const db = firebaseAdmin.firestore();

const wideShallowPinchData: GripModel = {
    id: GripTypeEnum.Pinch + '_' + SubGripTypeEnum.wideShallow,
    gripType: GripTypeEnum.Pinch,
    subGripType: SubGripTypeEnum.wideShallow
  }
  
  const wideDeepPinchData: GripModel = {
    id: GripTypeEnum.Pinch + '_' + SubGripTypeEnum.wideDeep,
    gripType: GripTypeEnum.Pinch,
    subGripType: SubGripTypeEnum.wideDeep
  }
db.collection("Grips").doc(wideDeepPinchData.id).set(wideDeepPinchData);
db.collection("Grips").doc(wideShallowPinchData.id).set(wideShallowPinchData);
