/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/auth';
import { userHasProperAuthLevel } from '../utilityFunctions/userHasProperAuthenticationLevel';
import Course from '../models/course/Course';
import AuthLevel from '../models/user/AuthLevel';


// Changes course content available to students
// And saves other fields which may have been updated
// Web provides an array of sections representing all content to be published
// Course content is overwritten, as such, to delete an element in the course
// structure, Web must omit it from the sections array.
// Data is expected to contain 1 field:
// course: The Course object representing the course
const publishCourse = https.onCall(async (data, ctx) => {
  await userHasProperAuthLevel(ctx.auth?.uid as string, AuthLevel.TEACHER);
  if (data.course === undefined) {
    throw new HttpsError('invalid-argument', 'course was not provided');
  }
  const course: Course = data.course;
  firestore().collection('Courses').doc(data.courseId).update({
    contributors: course.contributors,
    courseNumber: course.courseNumber,
    courseTitle: course.courseTitle,
    details: course.details,
    imageUrl: course.imageUrl,
    password: course.password,
    savedSections: course.savedSections,
    tags: course.tags,
    publishedSections: course.publishedSections,
  }).then(() => {
    return;
  }).catch(() => {
    // Triggered if the update fails
    throw new HttpsError('not-found', 'The course does not exist');
  });
});

export default publishCourse;
