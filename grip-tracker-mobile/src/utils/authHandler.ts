import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  deleteUser,
  User
} from 'firebase/auth';

import { auth } from './firebase';

const handleSignUp = async (email: string, password: string) : Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;
  sendEmailVerification(user);
  return user;
};

const handleLogin = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log("-----------> userCredential")
  console.log(userCredential)
  const { user } = userCredential;
  if (user.emailVerified) {
    return auth.currentUser?.uid;
  }

  signOut(auth);
  return undefined;
};

const handleResetPassword = (email: string) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log(`Password reset email was sent to ${email}`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`errorCode: ${errorCode}\nerrorMessage: ${errorMessage}\nGL!`);
    });
};

const handlerCurrentDeleteUser = async () => {
  if (auth.currentUser) {
    await deleteUser(auth.currentUser)
    .then(() => {
      console.log(`User ${auth.currentUser} deleted`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`\nerrorCode: ${errorCode}\nerrorMessage: ${errorMessage}\n`);
    });
  } else {
    console.log(`No current user logged in, auth.currentUser :  ${auth.currentUser}`);
  }
}

export {
  handleSignUp, handleLogin, handlerCurrentDeleteUser
};
