import { GripTypeEnum } from "../grip/GripTypeEnum";
import { ChallengeModel } from "./ChallengeModel";

export type ChallengeDictionary = Record<GripTypeEnum, ChallengeModel[]>;
