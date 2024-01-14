import { pubsub } from 'firebase-functions';
import admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/v1/auth';

// Scheduled function which runs once at midnight
// eslint-disable-next-line max-len
const deleteUnverifiedAccounts = pubsub.schedule('every day 00:00').onRun(async () => {
  const auth = admin.auth();
  // List users retrieves users in batches of 1000 users
  let usersBatch = await auth.listUsers();
  let userList : UserRecord[] = usersBatch.users;
  // Create list of all users in Google Auth
  while (usersBatch.pageToken !== undefined) {
    usersBatch = await auth.listUsers(undefined, usersBatch.pageToken);
    userList = userList.concat(usersBatch.users);
  }
  // Iterate of the list to find users who do not have their email verified
  userList.forEach(user => {
    if (!user.emailVerified) {
      // If a user's email is not verified, we allow a 24h grace period
      // The account's creation date's number of millis
      const creationDate = new Date(user.metadata.creationTime).getTime();
      const currentTime = Date.now();
      // Value of difference is in millis
      const difference = currentTime - creationDate;
      // There are 86 400 000 millis in a day
      if (difference >= 86400000) {
        // Firestore User deleted through the Google Auth onDelete trigger
        // User deletes are executed one at a time so onDelete is triggered
        // https://firebase.google.com/docs/auth/extend-with-functions#trigger_a_function_on_user_deletion
        auth.deleteUser(user.uid);
      }
    }
  });
});

export default deleteUnverifiedAccounts;
