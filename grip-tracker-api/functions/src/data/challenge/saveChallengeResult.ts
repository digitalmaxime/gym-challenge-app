/* eslint-disable max-len */
import { Request, Response, https } from 'firebase-functions'
import * as firebaseAdmin from 'firebase-admin'

const db = firebaseAdmin.firestore()

const saveChallengeProgress = https.onRequest(
  // async data => {
  //     const users = data.selectedUsers as {email: string, authLevel: AuthLevel} [];
  //     const newAuthLevel = data.authLevel as AuthLevel;
  //     const pendingUserList = await firestore().collection('PendingUsers').get();
  //     const userList = await firestore().collection('Users').get();
  // }
  async (request: Request, response: Response) => {
    const data = request.body.data
    data.timestamp = new Date().getTime()
    await db
      .collection('ChallengeProgress')
      .doc(data.userId + '-' + data.challengeId + '-' + data.timestamp)
      .set(data)

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.sendStatus(200)
  }
)

export default saveChallengeProgress

/** Call the function */
/** $ curl http://localhost:5001/gapris-6b7d5/us-central1/setMockData   */
