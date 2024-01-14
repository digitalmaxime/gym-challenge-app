/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/https';
import Section from './models/course/Section';
import { validateCourseProgress } from './utilityFunctions/courseProgressValidation';

const getCourseProgress = https.onCall(async data => {
  const db = firestore();
  const courseId : string = data.courseId;
  const userId : string = data.userId;
  if (!userId || !courseId) {
    throw new HttpsError('invalid-argument', 'User id or courseId provided is undefined..');
  }
  const progressRef = await db.collection('Users').doc(userId).collection('Progress').doc(courseId).get();
  if (progressRef.exists) {
    // Validate the content of the user's progress
    const courseDoc = await db.collection('Courses').doc(courseId).get();
    if (courseDoc.exists) {
      const courseData = courseDoc.data() as firestore.DocumentData;
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
      const progressData = progressRef.data() as firestore.DocumentData;
      const userProgress = progressData.progress;
      const validProgress = validateCourseProgress(userProgress, newProgressObj);
      await db.collection('Users').doc(userId).collection('Progress').doc(courseId).update({
        progress: validProgress,
      });
      progressData.progress = validProgress;
      return progressData;
    } else {
      throw new HttpsError('not-found', 'No course found matching this course id');
    }
  } else {
    throw new HttpsError('invalid-argument', 'no progress found for this course id..' + courseId);
  }
});

export default getCourseProgress;
