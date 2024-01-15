/* eslint-disable max-len */
import { Request, Response, https } from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import { grip } from "./gripData";

const db = firebaseAdmin.firestore();

const setChallengeData = https.onRequest(
  async (request: Request, response: Response) => {
    await db
      .collection("Grips")
      .doc(grip.id)
      .set(grip);
    // await db.collection('CoursChallengeses').doc(coursePHS1001.id).set(coursePHS1001);

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.sendStatus(200);
  }
);

export default setChallengeData;

/** Call the function */
/** $ curl http://localhost:5001/gapris-6b7d5/us-central1/setMockData   */
