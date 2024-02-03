import ChallengeModel from "../../models/challenge/ChallengeModel";
import { GripTypeEnum } from "../../models/grip/GripTypeEnum";
import { SubGripTypeEnum } from "../../models/grip/SubGripTypeEnum";
import {
  deadhangBodyWeightGripData,
  deadhangOnePlateGripData,
  deadhangTwoPlateGripData,
  deadhangThreePlateGripData,
  deadhangFourPlateGripData,
  wideDeepPinchGripData,
  wideShallowPinchGripData,
} from "../grip/gripData";

const deadhangBodyWeightChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + SubGripTypeEnum.bodyWeight,
  name: "Body weight deadhang",
  gripId: deadhangBodyWeightGripData.id,
  weight: 0,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};
const deadhangOnePlateChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + SubGripTypeEnum.onePlate,
  name: "One plate deadhang",
  gripId: deadhangOnePlateGripData.id,
  weight: 20.4117,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};

const deadhangTwoPlateChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + SubGripTypeEnum.twoPlate,
  name: "Two plates deadhang",
  gripId: deadhangTwoPlateGripData.id,
  weight: 20.4117 * 2,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};

const deadhangThreePlateChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + SubGripTypeEnum.threePlate,
  name: "Three plates deadhang",
  gripId: deadhangThreePlateGripData.id,
  weight: 20.4117 * 3,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};

const deadhangFourPlateChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + SubGripTypeEnum.fourPlate,
  name: "Four plates deadhang",
  gripId: deadhangFourPlateGripData.id,
  weight: 20.4117 * 4,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};

const pinchWideShallowTenSecondsChallenge: ChallengeModel = {
  id: GripTypeEnum.Pinch + "_" + SubGripTypeEnum.wideShallow + "_10Seconds",
  name: "Pinch wide shallow ten seconds challenge",
  gripId: wideShallowPinchGripData.id,
  weight: 0,
  duration: 10,
  imgUri: wideShallowPinchGripData.imgUri,
};

const pinchWideDeepTenSecondsChallenge: ChallengeModel = {
  id: GripTypeEnum.Pinch + "_" + SubGripTypeEnum.wideDeep + "_10Seconds",
  name: "Pinch wide deep ten seconds challenge",
  gripId: wideDeepPinchGripData.id,
  weight: 0,
  duration: 10,
  imgUri: wideDeepPinchGripData.imgUri,
};

export {
  deadhangBodyWeightChallenge,
  deadhangOnePlateChallenge,
  deadhangTwoPlateChallenge,
  deadhangThreePlateChallenge,
  deadhangFourPlateChallenge,
  pinchWideShallowTenSecondsChallenge,
  pinchWideDeepTenSecondsChallenge
};
