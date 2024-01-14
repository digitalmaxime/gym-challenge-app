import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import AuthLevel from './models/user/AuthLevel';

const listTeacherEmails = https.onCall(async () => {
  // TODO: Maybe add checks to see if user calling function is a teacher/admin
  // Find all teacher accounts
  // eslint-disable-next-line max-len
  const teacherList = await firestore().collection('Users').where('authLevel', '==', AuthLevel.TEACHER).get();
  const listOfEmails: string[] = [];
  for (const teacher of teacherList.docs) {
    listOfEmails.push(teacher.data().email);
  }
  return listOfEmails;
});

export default listTeacherEmails;
