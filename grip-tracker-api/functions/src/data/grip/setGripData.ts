import { type Request, type Response, https } from 'firebase-functions'
import * as firebaseAdmin from 'firebase-admin'
import { grip } from './gripData'

const db = firebaseAdmin.firestore()

const setChallengeData = https.onRequest(
  async (request: Request, response: Response) => {
    await db
      .collection('Grips')
      .doc(grip.id)
      .set(grip)

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.sendStatus(200)
  }
)

export default setChallengeData

/** Call the function */
/** $ curl http://localhost:5001/gapris-6b7d5/us-central1/setMockData   */
