import { GripModel } from '../../models/grip/GripModel';
import { GripTypeEnum } from '../../models/grip/GripTypeEnum';
import { DeadhangTypeEnum } from '../../models/grip/deadhang/DeadhangTypeEnum';
import { PinchTypeEnum } from '../../models/grip/pinch/PinchTypeEnum';

const wideShallowPinchGripData: GripModel = {
  id: GripTypeEnum.Pinch + "_" + PinchTypeEnum.wideShallow,
  gripType: GripTypeEnum.Pinch,
  subGripType: PinchTypeEnum.wideShallow,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/pinch_wideShallow.png?alt=media&token=e91d265a-3611-434e-ab99-f12c254dcf70'
}

const wideDeepPinchGripData: GripModel = {
  id: GripTypeEnum.Pinch + "_" + PinchTypeEnum.wideDeep,
  gripType: GripTypeEnum.Pinch,
  subGripType: PinchTypeEnum.wideDeep,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/pinch_wideDeep.png?alt=media&token=ea8c8eed-f451-4588-bbdf-6f0322cc880c'
}

const deadhangBodyWeightGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.bodyWeight,
  gripType: GripTypeEnum.Deadhang,
  subGripType: DeadhangTypeEnum.bodyWeight,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

const deadhangRightArmGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.rightArm,
  gripType: GripTypeEnum.Deadhang,
  subGripType: DeadhangTypeEnum.rightArm,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

const deadhangLeftArmGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.leftArm,
  gripType: GripTypeEnum.Deadhang,
  subGripType: DeadhangTypeEnum.leftArm,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

const deadhangOnePlateGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.onePlate,
  gripType: GripTypeEnum.Deadhang,
  subGripType: DeadhangTypeEnum.onePlate,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

const deadhangTwoPlateGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.twoPlate,
  gripType: GripTypeEnum.Deadhang,
  subGripType: DeadhangTypeEnum.twoPlate,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

const deadhangThreePlateGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.threePlate,
  gripType: GripTypeEnum.Deadhang,
  subGripType: DeadhangTypeEnum.threePlate,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

const deadhangFourPlateGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + DeadhangTypeEnum.fourPlate,
  gripType: GripTypeEnum.Deadhang,
  subGripType: DeadhangTypeEnum.fourPlate,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

export { wideShallowPinchGripData, wideDeepPinchGripData, deadhangBodyWeightGripData, deadhangRightArmGripData, deadhangLeftArmGripData, deadhangOnePlateGripData, deadhangTwoPlateGripData, deadhangThreePlateGripData, deadhangFourPlateGripData }
