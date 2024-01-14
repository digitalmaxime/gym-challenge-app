import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import AuthLevel from '../models/user/AuthLevel';


const getPendingUsers = https.onCall(async () => {
  const userList = await firestore().collection('PendingUsers').get();
  const userArray : {email:string, authLevel: AuthLevel}[] = [];

  userList.docs.forEach( userDoc => {
    userDoc.data();
    userArray.push({ email: userDoc.data().email,
      authLevel: userDoc.data().authLevel });
  });

  return userArray;
});

export default getPendingUsers;

