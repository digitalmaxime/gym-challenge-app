import { onCall } from "firebase-functions/v2/https";
import * as firebaseAdmin from "firebase-admin";
import { ChallengeProgressModel } from "../models/challengeProgress/challengeProgressModel";

const db = firebaseAdmin.firestore();

const saveChallengeProgress = onCall(async (request) => {
  const uid = request.auth?.uid;
  const token = request.auth?.token || null;
  const email = request.auth?.token.email || null;

  console.log("uid: ", uid);
  console.log("token: ", token);
  console.log("email: ", email);

  // TODO: Ajouter validation

  const data = request.data as ChallengeProgressModel;
  data.timestamp = new Date().getTime();

  try {
    const userChallengeExistingProgresses = await db
      .collection("ChallengeProgress")
      .where("userId", "==", uid)
      .get();
    console.log("**********************>>>");
    // userChallengeExistingProgresses.docs.forEach((x) => {
    //   const progress = x.data() as ChallengeProgressModel;
    //   const time = new Date(progress.timestamp).setHours(0, 0, 0, 0);
    //   console.log(time);
    // });
    const existingProgressWithSameDate =
      userChallengeExistingProgresses.docs.find((x) => {
        const existingProgress = x.data() as ChallengeProgressModel;
        const existingProgressTimestamp = new Date(
          existingProgress.timestamp
        ).setHours(0, 0, 0, 0);

        const dataDate = new Date(data.timestamp).setHours(0, 0, 0, 0);
        
        return (
          dataDate === existingProgressTimestamp &&
          data.challengeId === existingProgress.challengeId
        );
      });
    console.log("<<<**********************");

    if (existingProgressWithSameDate) {
      console.log("!*!*!*!*!*")
      console.log(existingProgressWithSameDate)
      console.log("!*!*!*!*!*")
      await db
        .collection("ChallengeProgress")
        .doc(existingProgressWithSameDate.id)
        .update({ ...data, userId: uid });
    } else {
      await db.collection("ChallengeProgress").add({ ...data, userId: uid });
    }

    return;
  } catch (e) {
    console.log(e);
  }
});

export default saveChallengeProgress;
