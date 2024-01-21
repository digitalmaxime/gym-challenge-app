import * as firebaseAdmin from "firebase-admin";
import { GripModel } from "../models/grip/GripModel";
import { CallableRequest, onCall } from "firebase-functions/v2/https";

const db = firebaseAdmin.firestore();

const getFilteredGrips = onCall(async (_request: CallableRequest) => {
  const gripType = _request?.data?.gripType;
  console.log("********")
  console.log(gripType);
  const grips = (
    await db.collection("Grips").where("gripType", "==", gripType).get()
  ).docs;

  const arr: GripModel[] = [];
  grips.forEach((grip) => {
    console.log(grip.data(), "\n----------\n");
    arr.push(grip.data() as GripModel);
  });

  return arr;
  // return response.json(arr);

  // let stuff: GripModel[] = [];
  // db.collection("Grips").get().then(snapshot => {
  //     snapshot.forEach((doc: QueryDocumentSnapshot<GripModel>) => {
  //         const grip: GripModel = {
  //             "id": doc.id,
  //             gripType: doc.data.gripType,
  //             subGripType: doc.data.subGripType,
  //         }
  //         stuff = stuff.concat(newelement);
  //     });
  //     response.send(stuff)
  //     return "";
  // }).catch(reason => {
  //     response.send(reason)
  // })
});

export default getFilteredGrips;
