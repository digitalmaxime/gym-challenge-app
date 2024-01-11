/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import { HttpsError } from 'firebase-functions/v1/auth';
import Question from '../models/course/question/Question';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateIsCourseType(data: any) {
  const isCourseTypeRespected =
    data.courseNumber && data.savedSections && data.courseTitle;

  if (!isCourseTypeRespected) {
    throw new HttpsError(
      'invalid-argument',
      'Course is mal formed, missing either courseNumber, savedSections or courseTitle',
    );
  }

  const isSectionRespected =
    data.savedSections[0] &&
    data.savedSections[0]?.name &&
    data.savedSections[0]?.units[0];
  if (!isSectionRespected) {
    throw new HttpsError('invalid-argument', 'Course Section is mal formed');
  }

  const isUnitRespected =
    data.savedSections[0]?.units[0]?.id &&
    data.savedSections[0]?.units[0]?.name &&
    data.savedSections[0]?.units[0]?.hintUri == '';
  if (!isUnitRespected) {
    throw new HttpsError('invalid-argument', 'Course unit is mal formed');
  }

  const isLessonRespected =
    typeof (data.savedSections[0]?.units[0]?.lessons[0]?.id) &&
    typeof (data.savedSections[0]?.units[0]?.lessons[0]?.questions);
  if (!isLessonRespected) {
    throw new HttpsError('invalid-argument', 'Course lesson is mal formed');
  }

  const questions: Question[] = data.savedSections[0]?.units[0]?.lessons[0].questions; // TODO: quadruple niveau de for loop lol
  for (const question of questions) {
    const isQuestionRespected =
      data.savedSections[0]?.units[0]?.lessons[0]?.questions[0].id &&
      typeof (question.type) == 'number' &&
      question.questionText && // TODO: valider
      question.correctAnswers &&
      question.otherAnswers;
    if (!isQuestionRespected) {
      throw new HttpsError('invalid-argument', 'Course question is mal formed');
    }
  }

  return true;
}
