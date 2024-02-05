import * as firebaseAdmin from "firebase-admin";
import { CallableRequest, onCall } from "firebase-functions/v2/https";
import ChallengeModel from "../models/challenge/ChallengeModel";

const db = firebaseAdmin.firestore();

const getChallengeProgress = onCall(async (_request: CallableRequest) => {
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%")
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%")
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%")
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%")
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%")
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%")
  const userId = _request.data.userId;
  const gripType = _request.data.gripType;
  const subGripType = _request.data.subGripType;

  console.log("userId", userId)
  console.log("gripType", gripType)
  console.log("subGripType", subGripType)

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
      
      const challengeIdsArray: ChallengeModel[] = [];
      challenges.forEach((challenge) => {
        challengeIdsArray.push(challenge.data().id);
      });
      console.log("Challenges: ", challengeIdsArray)
      
      /** Get the progress */
      const progress = (
        await db.collection("ChallengeProgress").where("challengeId", "in", challengeIdsArray).where("userId", "==", userId).get()
        ).docs;
        
        const progressArray: ChallengeProgressModel[] = [];
        progress.forEach((progress) => {
          progressArray.push(progress.data() as ChallengeProgressModel);
        });
        console.log("Progress : ", progressArray)

  return progressArray;
});

export default getChallengeProgress;