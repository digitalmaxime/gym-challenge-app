import saveChallengeProgress from "../../challenge/saveChallengeProgress";
import ChallengeModel from "../../models/challenge/ChallengeModel";
import { ChallengeProgressModel } from "../../models/challengeProgress/challengeProgressModel";
import { GripTypeEnum } from "../../models/grip/GripTypeEnum";
import { DeadhangTypeEnum } from "../../models/grip/deadhang/DeadhangTypeEnum";
import { PinchTypeEnum } from "../../models/grip/pinch/PinchTypeEnum";
import {
  deadhangBodyWeightGripData,
  deadhangOnePlateGripData,
  deadhangTwoPlateGripData,
  deadhangThreePlateGripData,
  deadhangFourPlateGripData,
  wideDeepPinchGripData,
  wideShallowPinchGripData,
  deadhangRightArmGripData,
  deadhangLeftArmGripData,
} from "../grip/gripData";

const deadhangBodyWeightChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.bodyWeight,
  name: "Body weight",
  gripId: deadhangBodyWeightGripData.id,
  weight: 0,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};

const deadhangRightArmChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.rightArm,
  name: "right arm",
  gripId: deadhangRightArmGripData.id,
  weight: 0,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};

const deadhangLeftArmChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.leftArm,
  name: "left arm",
  gripId: deadhangLeftArmGripData.id,
  weight: 0,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};

const deadhangOnePlateChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.onePlate,
  name: "One plate",
  gripId: deadhangOnePlateGripData.id,
  weight: 20.4117,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};

const deadhangTwoPlateChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.twoPlate,
  name: "Two plates",
  gripId: deadhangTwoPlateGripData.id,
  weight: 20.4117 * 2,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};

const deadhangThreePlateChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.threePlate,
  name: "Three plates",
  gripId: deadhangThreePlateGripData.id,
  weight: 20.4117 * 3,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};

const deadhangFourPlateChallenge: ChallengeModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.fourPlate,
  name: "Four plates",
  gripId: deadhangFourPlateGripData.id,
  weight: 20.4117 * 4,
  duration: 0,
  imgUri:
    "https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762",
};

const pinchWideShallowTenSecondsChallenge: ChallengeModel = {
  id: GripTypeEnum.Pinch + "_" + PinchTypeEnum.wideShallow + "_10Seconds",
  name: "Pinch wide shallow ten seconds",
  gripId: wideShallowPinchGripData.id,
  weight: 0,
  duration: 10,
  imgUri: wideShallowPinchGripData.imgUri,
};

const pinchWideDeepTenSecondsChallenge: ChallengeModel = {
  id: GripTypeEnum.Pinch + "_" + PinchTypeEnum.wideDeep + "_10Seconds",
  name: "Pinch wide deep ten seconds",
  gripId: wideDeepPinchGripData.id,
  weight: 0,
  duration: 10,
  imgUri: wideDeepPinchGripData.imgUri,
};

export {
  deadhangBodyWeightChallenge,
  deadhangRightArmChallenge,
  deadhangLeftArmChallenge,
  deadhangOnePlateChallenge,
  deadhangTwoPlateChallenge,
  deadhangThreePlateChallenge,
  deadhangFourPlateChallenge,
  pinchWideShallowTenSecondsChallenge,
  pinchWideDeepTenSecondsChallenge
};

