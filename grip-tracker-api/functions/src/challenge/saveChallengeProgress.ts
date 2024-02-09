import { onCall } from "firebase-functions/v2/https";
import * as firebaseAdmin from "firebase-admin";

const db = firebaseAdmin.firestore();

const saveChallengeProgress = onCall(async (request) => {
  const uid = request.auth?.uid;
  const token = request.auth?.token || null;
  const email = request.auth?.token.email || null;

  console.log("uid: ", uid);
  console.log("token: ", token);
  console.log("email: ", email);

  // TODO: Ajouter validation

  const data = request.data;
  data.timestamp = new Date().getTime();

  try {
    await db.collection("ChallengeProgress").add({...data, userId: uid});

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
