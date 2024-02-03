import * as firebaseAdmin from "firebase-admin";
import { CallableRequest, onCall } from "firebase-functions/v2/https";
import ChallengeModel from "../models/challenge/ChallengeModel";

const db = firebaseAdmin.firestore();

const getFilteredChallenges = onCall(async (_request: CallableRequest) => {
  const gripType = _request?.data?.gripType;
  
  const grips = (
    await db.collection("Grips").where("gripType", "==", gripType).get()
    ).docs;
    
    const gripIdsArray: string[] = [];
    grips.forEach((grip) => {
      gripIdsArray.push(grip.data().id);
    });
  
  const challenges = (
    await db.collection("Challenges").where("gripId", "in", gripIdsArray).get()
  ).docs;

  const challengesArray: ChallengeModel[] = [];
  challenges.forEach((challenge) => {
    challengesArray.push(challenge.data() as ChallengeModel);
  });

  return challengesArray;
});

export default getFilteredChallenges;
