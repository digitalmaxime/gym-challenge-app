import { CrimpTypeEnum } from "../grip/crimp/CrimpTypeEnum";
import { DeadhangTypeEnum } from "../grip/deadhang/DeadhangTypeEnum";
import { PinchTypeEnum } from "../grip/pinch/PinchTypeEnum";

export type ProgressDictionary = {
    PinchProgresses: Record<PinchTypeEnum, ChallengeProgressModel[]>;
    DeadhangProgresses: Record<DeadhangTypeEnum, ChallengeProgressModel[]>;
    CrimpProgresses: Record<CrimpTypeEnum, ChallengeProgressModel[]>;
}