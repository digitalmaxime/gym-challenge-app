import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
  MODE,
} from '@env';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebaseFunctions = getFunctions(app);

export type FunctionsErrorCode =
    | 'ok'
    | 'cancelled'
    | 'unknown'
    | 'invalid-argument'
    | 'deadline-exceeded'
    | 'not-found'
    | 'already-exists'
    | 'permission-denied'
    | 'resource-exhausted'
    | 'failed-precondition'
    | 'aborted'
    | 'out-of-range'
    | 'unimplemented'
    | 'internal'
    | 'unavailable'
    | 'data-loss'
    | 'unauthenticated';

if (MODE === 'emulator') {
  console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
  console.log('◊◊◊ ENV MODE : firebase Emulator ◊◊◊');
  console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
  connectFunctionsEmulator(firebaseFunctions, 'localhost', 5001);
  connectAuthEmulator(auth, 'http://localhost:9099');
} else if (MODE === 'cloud') {
  console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
  console.log('◊◊◊ ENV MODE :  CLOUD (firebase console) ◊◊◊');
  console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
} else {
  console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
  console.log('◊◊◊ ENV MODE : no default env set');
  console.log('◊◊◊ starting with firebase emulator');
  console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFunctionsEmulator(firebaseFunctions, 'localhost', 5001);
}

export { app, auth };
