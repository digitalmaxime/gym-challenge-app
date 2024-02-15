import * as firebaseAdmin from "firebase-admin";
import { CallableRequest, onCall } from "firebase-functions/v2/https";
import { ChallengeProgressModel } from "../models/challengeProgress/challengeProgressModel";

const db = firebaseAdmin.firestore();

const getChallengeProgress = onCall(async (request: CallableRequest) => {
  
  const uid = request.auth?.uid;
  const token = request.auth?.token || null;
  const email = request.auth?.token.email || null;

  console.log("uid: ", uid);
  console.log("token: ", token);
  console.log("email: ", email);

  const gripType = request.data.gripType;
  const subGripType = request.data.subGripType;

  /** Get the grips (fast)*/
  const grips = (
    await db.collection("Grips").where("gripType", "==", gripType).where("subGripType", "==", subGripType).get()
    ).docs;
    
    const gripIdsArray: string[] = [];
    grips.forEach((grip) => {
      gripIdsArray.push(grip.data().id);
    });

    const gripId = gripIdsArray[0];

    /** Get the challenges (fast)*/
    const challenges = (
      await db.collection("Challenges").where("gripId", "==", gripId).get()
      ).docs;
      
      const challengeIdsArray: string[] = [];
      challenges.forEach((challenge) => {
        challengeIdsArray.push(challenge.data().id);
      });
      
      /** Get the progress */
      const progress = (
        await db.collection("ChallengeProgress").where("challengeId", "in", challengeIdsArray).where("userId", "==", uid).get()
        ).docs;
        
        const progressArray: ChallengeProgressModel[] = [];
        progress.forEach((progress) => {
          progressArray.push(progress.data() as ChallengeProgressModel);
        });

        
  return progressArray;
});

export default getChallengeProgress;
