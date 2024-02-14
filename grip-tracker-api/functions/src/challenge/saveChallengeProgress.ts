import { onCall } from "firebase-functions/v2/https";
import * as firebaseAdmin from "firebase-admin";
import { ChallengeProgressModel } from "../models/challengeProgress/challengeProgressModel";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";

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
    const toto = await db
      .collection("ChallengeProgress")
      .where("userId", "==", uid)
      .get();
    console.log("**********************>>>");
    toto.docs.forEach((x) => {
      const toto: ChallengeProgressModel = x.data() as ChallengeProgressModel;
      const time = new Date(toto.timestamp).setHours(0, 0, 0, 0);
      console.log(time);
    });
    const existingProgressWithSameDate = toto.docs.find((x) => {
      const existingProgress = x.data() as ChallengeProgressModel;
      const existingProgressTimestamp = new Date(
        existingProgress.timestamp
      ).setHours(0, 0, 0, 0);
      
      console.log("existingProgressDate", existingProgressTimestamp);
      const dataDate = new Date(data.timestamp).setHours(0, 0, 0, 0);
      console.log("dataDate: ", dataDate);
      
      return dataDate == existingProgressTimestamp;
    });
    console.log("<<<**********************");

    if (existingProgressWithSameDate) {
      await db
        .collection("ChallengeProgress")
        .doc(existingProgressWithSameDate.id)
        .update({ ...data, userId: uid });
    } else {
      await db.collection("ChallengeProgress").add({ ...data, userId: uid });
    }

    // response.setHeader('Access-Control-Allow-Origin', '*')
    // response.sendStatus(201)
    // console.log(response.status)
    return;
  } catch (e) {
    console.log("ERROR :");
    console.log(e);
  }
});

export default saveChallengeProgress;
