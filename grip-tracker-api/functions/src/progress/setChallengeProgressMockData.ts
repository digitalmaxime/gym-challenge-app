import { onCall } from "firebase-functions/v2/https";
import * as firebaseAdmin from "firebase-admin";
import { ChallengeProgressModel } from "../models/challengeProgress/challengeProgressModel";

const db = firebaseAdmin.firestore();

const setChallengeProgressMockData = onCall(async (request) => {
  const uid = request.auth?.uid;
  
  for (let i = 1; i < 100; i++) {
    
    if (i % 3 === 0) continue;

    const challengeProgressesData = {
      userId: uid,
      challengeId: "pinch_wideDeep_10Seconds",
      duration: 10,
      weight: Math.round(Math.random() * 10 * Math.max(1, i/20)),
      timestamp: +new Date() - i * 24 * 60 * 60 * 1000
    } as ChallengeProgressModel;

    await db.collection("ChallengeProgress").add(challengeProgressesData);
  }
});

export default setChallengeProgressMockData;
