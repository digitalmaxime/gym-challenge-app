import { GripModel } from "./GripModel";
import { GripTypeEnum } from "./GripTypeEnum";

export type GripDictionary = Record<GripTypeEnum, GripModel[]>;
