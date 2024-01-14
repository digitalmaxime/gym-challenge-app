// /* eslint-disable max-len */
// import { https } from 'firebase-functions';
// import { firestore } from 'firebase-admin';
// import { HttpsError } from 'firebase-functions/v1/auth';
// import UserModel from '../models/user/UserModel';

// // Changes course content available to students
// // And saves other fields which may have been updated
// // Web provides an array of sections representing all content to be published
// // Course content is overwritten, as such, to delete an element in the course
// // structure, Web must omit it from the sections array.
// // Data is expected to contain 1 field:
// // course: The Course object representing the course
// const publishCourse = https.onCall(async (data, ctx) => {

//   const user: UserModel = data.user;
//   firestore().collection('Users').doc(data.userId).create({
//     contributors: course.contributors,
//     courseNumber: course.courseNumber,
//     courseTitle: course.courseTitle,
//     details: course.details,
//     imageUrl: course.imageUrl,
//     password: course.password,
//     savedSections: course.savedSections,
//     tags: course.tags,
//     publishedSections: course.publishedSections,
//   }).then(() => {
//     return;
//   }).catch(() => {
//     // Triggered if the update fails
//     throw new HttpsError('not-found', 'The course does not exist');
//   });
// });

// export default publishCourse;
