/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/https';
import Section from '../models/course/Section';
import CourseProgress from '../models/progress/CourseProgress';
import { EventAnalytics, EventType } from '../mocks/getDummyAnalytics';

// Function called whenever a mobile user follows a course
// Data should contain a password field when attempting to follow a private course
// A courseId field for the course to follow
const followCourse = https.onCall(async (data, ctx) => {
  const courseId: string = data.courseId;
  const userId: string = ctx.auth?.uid as string;
  if (courseId === undefined || userId === undefined) {
    throw new HttpsError('invalid-argument', 'A courseId or userId was not provided');
  } else {
    const courseDoc = await firestore().collection('Courses').doc(courseId).get();
    if (!courseDoc.exists) {
      throw new HttpsError('not-found', 'The provided courseId did not match any Courses document');
    } else {
      const courseData = courseDoc.data() as firestore.DocumentData;
      // Check if the course has a password
      if ((courseData.password as string).length !== 0) {
        if (data.password === undefined || courseData.password !== data.password) {
          throw new HttpsError('invalid-argument', 'A password was not provided or the provided password did not match the course password');
        }
      }
      // Add event to analytics showing that a user joined the course
      const analyticsEvent: EventAnalytics = {
        useremail: ctx.auth?.token.email as string,
        type: EventType.COURSE,
        objectId: courseId,
        status: true,
        timestamp: firestore.Timestamp.now().toDate().getTime(),
      };
      firestore().collection('Courses').doc(courseId).collection('Analytics').add(analyticsEvent);

      // Creates a blank courseProgress
      const sections: Section[] = courseData.publishedSections;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newProgressObj: any = {};
      for (const section of sections) {
        const sectionId: string = section.id;
        newProgressObj[sectionId] = { isCompleted: false };
        for (const unit of section.units) {
          const unitId = `${unit.id}`;
          newProgressObj[unitId] = { isCompleted: false };
          for (const lesson of unit.lessons) {
            const lessonId = `${lesson.id}`;
            newProgressObj[lessonId] = { isCompleted: false };
          }
        }
      }
      const newCourseProgress: CourseProgress = { userId, courseId, userScore: 0, progress: newProgressObj };
      await firestore().collection('Users').doc(userId).collection('Progress').doc(courseId).set(newCourseProgress);
      return newCourseProgress;
    }
  }
});

export default followCourse;
