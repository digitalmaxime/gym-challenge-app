import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';

import { auth } from './firebase';
const handleSignUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;
  sendEmailVerification(user);    
};

const handleLogin = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log("-----------> userCredential")
  console.log(userCredential)
  // Signed in
  const { user } = userCredential;
  if (user.emailVerified) {
    return auth.currentUser?.uid;
  }

  signOut(auth);
  return undefined;
};

const handleLoginDummy = async (email: string, password: string) => {
  return '123';
};

const handleResetPassword = (email: string) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      console.log(`Password reset email was sent to ${email}`);
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`errorCode: ${errorCode}\nerrorMessage: ${errorMessage}\nGL!`);
    });
};

export {
  handleSignUp, handleLogin, auth, handleLoginDummy
};
