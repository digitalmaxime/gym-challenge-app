/* eslint-disable max-len */
import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import QuestionEnum from '../models/course/question/QuestionEnum';
import { v4 as uuidv4 } from 'uuid';
import { validateIsCourseType } from '../utilityFunctions/courseTypeChecking';
import { userHasProperAuthLevel } from '../utilityFunctions/userHasProperAuthenticationLevel';

const registerCourse = https.onCall(
  async (data, ctx) => {
    await userHasProperAuthLevel(ctx.auth?.uid as string, 1);
    // Request should contain all info necessary to add a Course to DB
    const sectionsUuid = uuidv4();
    const unitUuid = sectionsUuid + '$' + uuidv4();
    const lessonUuid = unitUuid + '$' + uuidv4();
    const questionUuid = lessonUuid + '$' + uuidv4();

    // Create a new document in Firestore
    // TODO: etait tres mauvais,
    // l'objet devrait etre creer, valider et ensuite passer a 'add'
    const course = {
      contributors: data.id,
      courseNumber: data.courseNumber,
      courseTitle: data.courseTitle,
      details: data.details,
      password: data.password,
      tags: data.tags,
      imageUrl: data.imageUrl,
      savedSections: [{
        controlPoint: null,
        id: sectionsUuid,
        name: 'Section autogénerée',
        units: [{
          description: 'Description autogénerée',
          id: unitUuid,
          lessons: [{
            id: lessonUuid,
            name: 'Lesson autogénerée',
            questions: [{
              correctAnswers: ['bonne réponse'],
              otherAnswers: ['non', 'incorrect'],
              type: QuestionEnum.MULTIPLE_CHOICES,
              name: 'Question autogénerée',
              questionText: 'Choisir la bonne réponse',
              id: questionUuid,
              imageUri: '',
            }],
          }],
          name: 'unité autogénerée',
          hintUri: '',
        }],
      }],
      publishedSections: null,
    };

    validateIsCourseType(course);

    await firestore().collection('Courses').add(course);

    return 'gotit';
  },
);

export default registerCourse;
