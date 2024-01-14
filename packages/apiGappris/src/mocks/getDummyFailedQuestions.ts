/* eslint-disable max-len */
import { https } from 'firebase-functions';


const getDummyFailedQuestions = https.onCall(async () => {
  return [];
});

export default getDummyFailedQuestions;
