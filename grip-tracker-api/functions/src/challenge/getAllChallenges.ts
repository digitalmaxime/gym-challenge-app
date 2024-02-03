import * as firebaseAdmin from 'firebase-admin'
import { CallableRequest, onCall } from 'firebase-functions/v2/https';
import ChallengeModel from '../models/challenge/ChallengeModel';
const db = firebaseAdmin.firestore()

const getAllChallenges = onCall(
  async (request: CallableRequest) => {
    const grips = (await db.collection('Challenges').get()).docs;
    const arr: ChallengeModel[] = [];
    grips.forEach(challenge => arr.push(challenge.data() as ChallengeModel));
    
    return arr;
  }
)

export default getAllChallenges
