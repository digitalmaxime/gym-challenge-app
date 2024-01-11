/* eslint-disable max-len */
import { Request, Response, https } from 'firebase-functions';
import admin from 'firebase-admin';
import { courseCIV1000, coursePHS1001 } from './courseData';

const db = admin.firestore();

const setMockData = https.onRequest(
  async (request: Request, response: Response) => {
    await db.collection('Courses').doc(courseCIV1000.id).set(courseCIV1000);
    await db.collection('Courses').doc(coursePHS1001.id).set(coursePHS1001);

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.sendStatus(200);
  },
);

export default setMockData;

/** Call the function */
/** $ curl http://localhost:5001/gapris-6b7d5/us-central1/setMockData   */
