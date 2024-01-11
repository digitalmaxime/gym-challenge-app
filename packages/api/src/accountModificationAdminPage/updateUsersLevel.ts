/* eslint-disable @typescript-eslint/no-explicit-any */
import { https } from 'firebase-functions';
import AuthLevel from '../models/user/AuthLevel';
import { firestore } from 'firebase-admin';


// Function called when a user is created or tries to login to the web interface
// Without the proper auth level, notifying the Admin
// that an account may be asking to be added as a Teacher
const updateUsersLevel = https.onCall(async data => {
  const users = data.selectedUsers as {email: string, authLevel: AuthLevel} [];
  const newAuthLevel = data.authLevel as AuthLevel;
  const pendingUserList = await firestore().collection('PendingUsers').get();
  const userList = await firestore().collection('Users').get();

  for (const user of users) {
    const findEmail = (u:any) => u.data().email === user.email;
    const pendingUserDoc = pendingUserList.docs.find(findEmail);
    if (pendingUserDoc !== undefined ) {
      await pendingUserDoc.ref.delete();
    }
    const userDoc = userList.docs.find(findEmail);
    if (userDoc !== undefined ) {
      await userDoc.ref.update({ authLevel: newAuthLevel });
    }
  }
  return;
});

export default updateUsersLevel;
