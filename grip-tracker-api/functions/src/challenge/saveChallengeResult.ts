/* eslint-disable max-len */
import { Request, Response, https } from 'firebase-functions'
import * as firebaseAdmin from 'firebase-admin'

const db = firebaseAdmin.firestore()

const saveChallengeProgress = https.onRequest(
  async (request: Request, response: Response) => {
    const data = request.body.data
    data.timestamp = new Date().getTime()
    await db
      .collection('ChallengeProgress').add(data);

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.sendStatus(201)
  }
)

export default saveChallengeProgress
