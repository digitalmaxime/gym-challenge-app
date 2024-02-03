import { GripTypeEnum } from './GripTypeEnum';
import { SubGripTypeEnum } from './SubGripTypeEnum';

export interface GripModel {
    id: string;
    gripType: GripTypeEnum;
    subGripType: SubGripTypeEnum;
    imgUri: string;
}
