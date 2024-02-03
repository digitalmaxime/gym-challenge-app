import { GripModel } from '../../models/grip/GripModel';
import { GripTypeEnum } from '../../models/grip/GripTypeEnum';
import { SubGripTypeEnum } from '../../models/grip/SubGripTypeEnum';

const wideShallowPinchGripData: GripModel = {
  id: GripTypeEnum.Pinch + "_" + SubGripTypeEnum.wideShallow,
  gripType: GripTypeEnum.Pinch,
  subGripType: SubGripTypeEnum.wideShallow,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/pinch_wideShallow.png?alt=media&token=e91d265a-3611-434e-ab99-f12c254dcf70'
}

const wideDeepPinchGripData: GripModel = {
  id: GripTypeEnum.Pinch + "_" + SubGripTypeEnum.wideDeep,
  gripType: GripTypeEnum.Pinch,
  subGripType: SubGripTypeEnum.wideDeep,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/pinch_wideDeep.png?alt=media&token=ea8c8eed-f451-4588-bbdf-6f0322cc880c'
}

const deadhangBodyWeightGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + SubGripTypeEnum.bodyWeight,
  gripType: GripTypeEnum.Deadhang,
  subGripType: SubGripTypeEnum.bodyWeight,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

const deadhangOnePlateGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + SubGripTypeEnum.onePlate,
  gripType: GripTypeEnum.Deadhang,
  subGripType: SubGripTypeEnum.onePlate,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

const deadhangTwoPlateGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + SubGripTypeEnum.twoPlate,
  gripType: GripTypeEnum.Deadhang,
  subGripType: SubGripTypeEnum.twoPlate,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

const deadhangThreePlateGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + SubGripTypeEnum.threePlate,
  gripType: GripTypeEnum.Deadhang,
  subGripType: SubGripTypeEnum.threePlate,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

const deadhangFourPlateGripData: GripModel = {
  id: GripTypeEnum.Deadhang + "_" + SubGripTypeEnum.fourPlate,
  gripType: GripTypeEnum.Deadhang,
  subGripType: SubGripTypeEnum.fourPlate,
  imgUri: 'https://firebasestorage.googleapis.com/v0/b/grip-tracker.appspot.com/o/deadhang.png?alt=media&token=0f2f01cf-56bd-4273-b958-7e476d8a0762'
}

export { wideShallowPinchGripData, wideDeepPinchGripData, deadhangBodyWeightGripData, deadhangOnePlateGripData, deadhangTwoPlateGripData, deadhangThreePlateGripData, deadhangFourPlateGripData }
