/* eslint-disable max-len */
import { type Request, type Response, https } from 'firebase-functions'
import * as firebaseAdmin from 'firebase-admin'
import { userMax, userMaude, userAntoine } from './mockUserData'

const db = firebaseAdmin.firestore()

const setMockUserData = https.onRequest(
  async (request: Request, response: Response) => {
    await db
      .collection('Users')
      .doc(userMax.id)
      .set(userMax)
    await db
      .collection('Users')
      .doc(userMaude.id)
      .set(userMaude)
    await db
      .collection('Users')
      .doc(userAntoine.id)
      .set(userAntoine)

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.sendStatus(200)
  }
)

export default setMockUserData

/** Call the function */
/** $ curl http://localhost:5001/gapris-6b7d5/us-central1/setMockData   */
