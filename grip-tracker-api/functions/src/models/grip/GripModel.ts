import { GripTypeEnum } from "./GripTypeEnum";
import { SubGripType } from "./SubGripType";

export interface GripModel {
    id: string;
    gripType: GripTypeEnum;
    subGripType: SubGripType;
    imgUri: string;
}
