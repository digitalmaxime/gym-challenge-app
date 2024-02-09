import * as firebaseAdmin from "firebase-admin";
import { CallableRequest, onCall } from "firebase-functions/v2/https";
import { GripTypeEnum } from "../models/grip/GripTypeEnum";
import { SubGripTypeEnum } from "../models/grip/SubGripTypeEnum";
import { ProgressDictionary } from "../models/challengeProgress/progressDictionary";

const db = firebaseAdmin.firestore();

const getUserChallengeProgresses = onCall(async (_request: CallableRequest) => {
  const userId = _request.data.userId;
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log("userId", userId);

  /** Get the users progresses (slow, needs indexing on userId) */
  const progress = (
    await db
      .collection("ChallengeProgress")
      .where("userId", "==", userId)
      .get()
  ).docs;

  const userProgressArray: ChallengeProgressModel[] = [];
  progress.forEach((progress) => {
    userProgressArray.push(progress.data() as ChallengeProgressModel);
  });
  console.log("Progress : ", userProgressArray);


  /** Initialize dictionary of Progresses */
  const progressDictionary: ProgressDictionary = {
    [GripTypeEnum.Pinch]: [],
    [GripTypeEnum.Crimp]: [],
    [GripTypeEnum.Deadhang]: []
  }

  // TODO: this is hardcoded
  const gripType = GripTypeEnum.Pinch;
  const subGripType = SubGripTypeEnum.wideDeep;

  Object.keys(GripTypeEnum).forEach((gripTypeKey) => {
    console.log("gripTypeKey: ", gripTypeKey)
  })
  Object.values(GripTypeEnum).forEach((gripTypeValue) => {
    console.log("    gripTypeValue: ", gripTypeValue)
  })

  /** Get the grips (fast)*/
  const grips = (
    await db.collection("Grips").where("gripType", "==", gripType).where("subGripType", "==", subGripType).get()
    ).docs;
    
    const gripIdsArray: string[] = [];
    grips.forEach((grip) => {
      gripIdsArray.push(grip.data().id);
    });
    console.log("Grips: ", gripIdsArray)
    const gripId = gripIdsArray[0];

    /** Get the challenges (fast)*/
    const challenges = (
      await db.collection("Challenges").where("gripId", "==", gripId).get()
      ).docs;
      
      const challengeIdsArray: string[] = [];
      challenges.forEach((challenge) => {
        challengeIdsArray.push(challenge.data().id);
      });
      console.log("Challenges: ", challengeIdsArray)
      
      /** Filter the progress */
      const filteredProgress = userProgressArray.filter(x => challengeIdsArray.includes(x.challengeId));
      progressDictionary.pinch = filteredProgress;

      console.log("8::::::::::::::D")
      console.log(progressDictionary);

  return progressDictionary;
});

export default getUserChallengeProgresses;
