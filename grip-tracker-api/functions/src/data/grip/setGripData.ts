import { type Request, type Response, https } from 'firebase-functions'
import * as firebaseAdmin from 'firebase-admin'
import { wideDeepPinchData, wideShallowPinchData } from './gripData'

const db = firebaseAdmin.firestore()

const setGripData = https.onRequest(
  async (request: Request, response: Response) => {
    await db
      .collection('Grips')
      .doc(wideDeepPinchData.id)
      .set(wideDeepPinchData)
    await db
      .collection('Grips')
      .doc(wideShallowPinchData.id)
      .set(wideShallowPinchData)

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.sendStatus(201)
  }
)

export default setGripData

/** Call the function */
/** $ curl http://localhost:5001/gapris-6b7d5/us-central1/setMockData   */
