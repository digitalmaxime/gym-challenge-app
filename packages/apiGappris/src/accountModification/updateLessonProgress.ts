/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/auth';
import CourseProgress from '../models/progress/CourseProgress';
import { EventAnalytics, EventType } from '../mocks/getDummyAnalytics';

const updateLessonProgress = https.onCall(async (data, ctx) => {
  const timestamp = firestore.Timestamp.now().toDate().getTime();
  const userId = data.userId;
  const courseId = data.courseId;
  const lessonId = data.lessonId;
  if (!userId || courseId === null || courseId === undefined) {
    throw new HttpsError('not-found', 'Course id or userId was not provided..');
  }

  const lessonCompletionEvent: EventAnalytics = {
    useremail: ctx.auth?.token.email as string,
    type: EventType.LESSON,
    objectId: lessonId,
    status: true,
    timestamp: timestamp,
  };
  await firestore().collection('Users').doc(userId).collection('Progress').doc(courseId).update({
    [`progress.${lessonId}`]: { isCompleted: true },
    'userScore': firestore.FieldValue.increment(1),
  });

  // Add Lesson completion event to Analytics
  firestore().collection('Courses').doc(courseId).collection('Analytics').add(lessonCompletionEvent);

  const sectionProgressSnapshot = await firestore().collection('Users').doc(userId).collection('Progress').doc(courseId).get();

  const courseProgress = sectionProgressSnapshot.data() as CourseProgress;

  if (
    !('progress' in courseProgress) ||
    !('userScore' in courseProgress) ||
    !('courseId' in courseProgress)
  ) {
    return;
  }

  const progress = courseProgress.progress;

  const unitId = lessonId.split('$').slice(0, 2).join('$');
  const sectionId = unitId.split('$').slice(0, 1).join('$');

  const isUnitAlreadyCompleted = progress[unitId].isCompleted;
  /** If unit is not already completed, check if the lesson completion makes the unit complete */
  if (!isUnitAlreadyCompleted) {
    let allLessonsCompleted = true;
    Object.keys(progress).forEach(key => {
      if (key !== unitId && key.includes(unitId)) {
        if (!progress[key].isCompleted) {
          allLessonsCompleted = false;
        }
      }
    });

    if (allLessonsCompleted) {
      /** All lesson in the unit were completed, so mark unit as completed */
      await firestore().collection('Users').doc(userId)
        .collection('Progress').doc(courseId).update({ [`progress.${unitId}`]: { isCompleted: true } });
      // Add Unit completion event to Analytics
      const unitCompletionEvent: EventAnalytics = {
        useremail: ctx.auth?.token.email as string,
        type: EventType.UNIT,
        objectId: unitId,
        status: true,
        timestamp: timestamp,
      };
      firestore().collection('Courses').doc(courseId).collection('Analytics').add(unitCompletionEvent);

      /** Section is not already completed, check if the units completion makes the unit complete */
      let allUnitsCompleted = true;
      Object.keys(progress).forEach(key => {
        if (key !== sectionId && key !== unitId && key.includes(sectionId)) {
          if (!progress[key].isCompleted) {
            allUnitsCompleted = false;
          }
        }
      });

      if (allUnitsCompleted) {
        await firestore().collection('Users').doc(userId)
          .collection('Progress').doc(courseId).update({ [`progress.${sectionId}`]: { isCompleted: true } });
        // Add Unit completion event to Analytics
        const sectionCompletionEvent: EventAnalytics = {
          useremail: ctx.auth?.token.email as string,
          type: EventType.SECTION,
          objectId: sectionId,
          status: true,
          timestamp: timestamp,
        };
        firestore().collection('Courses').doc(courseId).collection('Analytics').add(sectionCompletionEvent);
      }
    }
  }


  return courseProgress;
});

export default updateLessonProgress;
