import { GripModel } from '../../models/grip/GripModel';
import { GripTypeEnum } from '../../models/grip/GripTypeEnum';
import { SubGripTypeEnum } from '../../models/grip/SubGripTypeEnum';

const wideShallowPinchData: GripModel = {
  id: crypto.randomUUID(),
  gripType: GripTypeEnum.Pinch,
  subGripType: SubGripTypeEnum.wideShallow
}

const wideDeepPinchData: GripModel = {
  id: crypto.randomUUID(),
  gripType: GripTypeEnum.Pinch,
  subGripType: SubGripTypeEnum.wideDeep
}

export { wideShallowPinchData, wideDeepPinchData }
