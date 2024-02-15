import { firestore } from "firebase-admin";
import { CallableRequest, onCall } from "firebase-functions/v2/https";
import { GripTypeEnum } from "../models/grip/GripTypeEnum";
import { ProgressDictionary } from "../models/challengeProgress/progressDictionary";
import { PinchTypeEnum } from "../models/grip/pinch/PinchTypeEnum";
import { DeadhangTypeEnum } from "../models/grip/deadhang/DeadhangTypeEnum";
import { CrimpTypeEnum } from "../models/grip/crimp/CrimpTypeEnum";
import { SubGripType } from "../models/grip/SubGripType";
import { ChallengeProgressModel } from "../models/challengeProgress/challengeProgressModel";

const db = firestore();

// TODO: refactor into methods etc

const getUserChallengeProgresses = onCall(async (request: CallableRequest): Promise<ProgressDictionary> => {
  const uid = request.auth?.uid;
  const token = request.auth?.token || null;
  const email = request.auth?.token.email || null;

  console.log("uid: ", uid);
  console.log("token: ", token);
  console.log("email: ", email);

  /** Get the users progresses (slow, needs indexing on userId) */ // TODO: index on userId
  const progress = await db
    .collection("ChallengeProgress")
    .where("userId", "==", uid)
    .get();

  const userChallengeProgresses: ChallengeProgressModel[] = [];
  progress.forEach((progress) => {
    userChallengeProgresses.push(progress.data() as ChallengeProgressModel);
  });

  /** Initialize dictionary of Progresses */
  const progressDictionary: ProgressDictionary = {
    PinchProgresses: {
      [PinchTypeEnum.narrowShallow]: [],
      [PinchTypeEnum.narrowDeep]: [],
      [PinchTypeEnum.wideShallow]: [],
      [PinchTypeEnum.wideDeep]: [],
    },
    DeadhangProgresses: {
      [DeadhangTypeEnum.bodyWeight]: [],
      [DeadhangTypeEnum.onePlate]: [],
      [DeadhangTypeEnum.twoPlate]: [],
      [DeadhangTypeEnum.threePlate]: [],
      [DeadhangTypeEnum.fourPlate]: [],
    },

    CrimpProgresses: {
      [CrimpTypeEnum.sixMillimeter]: [],
      [CrimpTypeEnum.tenMillimeter]: [],
    },
  };

  for (const gripTypeValue of Object.values(GripTypeEnum)) {
    switch (gripTypeValue) {
      case GripTypeEnum.Pinch:
        for (const pinchType of Object.values(PinchTypeEnum)) {
          const gripId = await getGripId(GripTypeEnum.Pinch, pinchType);

          if (!gripId) continue;

          const challengeIds = await getChallenges(gripId);
          const filteredChallengeProgresses =
            filterChallengeProgresses(challengeIds);
          progressDictionary.PinchProgresses[pinchType] =
            filteredChallengeProgresses;
        }
        break;

      case GripTypeEnum.Deadhang:
        for (const deadhangType of Object.values(DeadhangTypeEnum)) {
          const gripId = await getGripId(GripTypeEnum.Deadhang, deadhangType);

          if (!gripId) continue;

          const challengeIds = await getChallenges(gripId);
          const filteredChallengeProgresses =
            filterChallengeProgresses(challengeIds);
          progressDictionary.DeadhangProgresses[deadhangType] =
            filteredChallengeProgresses;
        }
        break;
      case GripTypeEnum.Crimp:
        break;
    }
  }

  /** Get the grips (fast)*/
  async function getGripId(
    gripType: GripTypeEnum,
    subGripType: SubGripType
  ): Promise<string | undefined> {
    const ref = db.collection("Grips");
    const snapShot = await ref
      .where("gripType", "==", gripType)
      .where("subGripType", "==", subGripType)
      .get();

    if (snapShot.empty) {
      // TODO: handle
      console.log("No matching grip documents.");
      return;
    }

    const gripIdsArray: string[] = [];
    snapShot.forEach((grip) => {
      gripIdsArray.push(grip.data().id);
    });
    const gripId = gripIdsArray[0];
    console.log("----> ", gripId);

    return gripId;
  }

  /** Get the challenges (fast)*/
  async function getChallenges(gripId: string): Promise<string[]> {
    const ref = db.collection("Challenges");
    const snapShot = await ref.where("gripId", "==", gripId).get();
    if (snapShot.empty) {
      // TODO: handle
      console.log("No matching challenge documents.");
      return [];
    }

    const challengeIdsArray: string[] = [];
    snapShot.forEach((challenge) => {
      challengeIdsArray.push(challenge.data().id);
    });
    console.log("Challenges: ", challengeIdsArray);

    return challengeIdsArray;
  }

  /** Filter the progress */
  function filterChallengeProgresses(
    challengeIdsArray: string[]
  ): ChallengeProgressModel[] {
    const filteredChallengeProgresses = userChallengeProgresses
      .filter((x) => challengeIdsArray.includes(x.challengeId))
      // .sort((a, b) => a.timestamp - b.timestamp); // TODO: sort not working somehow..

    return filteredChallengeProgresses.sort((a, b) => a.timestamp - b.timestamp);
  }

  return progressDictionary;
});

export default getUserChallengeProgresses;
