// Dependencies for callable functions.
// const { logger } = require("firebase-functions/v2");
import { firestore } from 'firebase-admin'
const { onCall } = require('firebase-functions/v2/https')

// Dependencies for the addMessage function.
// const { getDatabase } = require("firebase-admin/database");
// const sanitizer = require("./sanitizer");

// Saves a message to the Firebase Realtime Database but sanitizes the
// text by removing swearwords.
const createChallenge = onCall(async (data: any) => {
  debugger
  const ref = await firestore().collection('users').doc(data.id).get()
  return { course: ref.data(), id: ref.id }
  // ...
  // Message text passed from the client.
  //   const text = request.data.text;
  //   // Authentication / user information is automatically added to the request.
  //   const uid = request.auth.uid;
  //   const name = request.auth.token.name || null;
  //   const picture = request.auth.token.picture || null;
  //   const email = request.auth.token.email || null;

  //   return getDatabase()
  //     .ref("/messages")
  //     .push({
  //       text: "hello world message",
  //       author: { uid, name, picture, email },
  //     })
  //     .then(() => {
  //       logger.info("New Message written");
  //       // Returning the sanitized message to the client.
  //       return { text: "hello world message" };
  //     });
})

export default createChallenge
// TODO: Distance between the location of the callable function and the location of the calling client can create network latency. To optimize performance, consider specifying the function location where applicable, and make sure to align the callable's location with the location set when you initialize the SDK on the client side.
// TODO: https://firebase.google.com/docs/functions/callable?gen=2nd#cors
