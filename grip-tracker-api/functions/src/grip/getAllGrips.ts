/* eslint-disable max-len */
import { Request, Response, https } from 'firebase-functions'
import * as firebaseAdmin from 'firebase-admin'
import { GripModel } from '../models/grip/GripModel';
const db = firebaseAdmin.firestore()

const getAllGrips = https.onCall(
  async (data, ctx): Promise<any> => {
    const grips = (await db.collection('Grips').get()).docs; //where('email', '==', data.email).get();
    const arr: GripModel[] = [];
    grips.forEach(grip => {console.log(grip.data(), "\n----------\n"); arr.push(grip.data() as GripModel)});
    
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
  }
)

export default getAllGrips

/** Call the function */
/** $ curl http://localhost:5001/gapris-6b7d5/us-central1/setMockData   */
