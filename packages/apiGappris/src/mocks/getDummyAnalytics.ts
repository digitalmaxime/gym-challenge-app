import { https } from 'firebase-functions';
import QuestionEnum from '../models/course/question/QuestionEnum';
import { v4 as uuidv4 } from 'uuid';

const courseId1 = uuidv4();
const sectionsUuid = uuidv4();
const unitUuid = sectionsUuid + '$' + uuidv4();
const lessonUuid = unitUuid + '$' + uuidv4();
const lessonUuid2 = unitUuid + '$' + uuidv4();
const questionUuid = lessonUuid + '$' + uuidv4();
const questionUuid2 = lessonUuid + '$' + uuidv4();
const questionUuid3 = lessonUuid + '$' + uuidv4();
const questionUuid4 = lessonUuid + '$' + uuidv4();
const questionUuid5 = lessonUuid2 + '$' + uuidv4();


// const courseId2 = uuidv4();
const c2SectionsUuid = uuidv4();
const c2UnitUuid = c2SectionsUuid + '$' + uuidv4();
const c2CPUuid = c2SectionsUuid + '$' + uuidv4();
const c2LessonUuid = c2UnitUuid + '$' + uuidv4();
const c2QuestionUuid = c2CPUuid + '$' + uuidv4();
const c2QuestionUuid2 = c2CPUuid + '$' + uuidv4();
const c2QuestionUuid3 = c2CPUuid + '$' + uuidv4();
const c2QuestionUuid4 = c2LessonUuid + '$' + uuidv4();

const course = {
  contributors: ['antonin4384@gmail.com'],
  courseNumber: 'MTH5555',
  courseTitle: 'Introduction aux analytiques',
  details: '',
  password: '',
  tags: ['analytiques', 'mock', 'data'],
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/gapris-6b7d5.appspot.com/o/chaise.jpg?alt=media&token=67014a8f-b397-4016-bc07-71d1f07487db',
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
        }, {
          correctAnswers: ['bonne réponse'],
          otherAnswers: ['non', 'incorrect'],
          type: QuestionEnum.FILL_IN_BROKEN_SENTENCES,
          name: 'Question autogénerée2',
          questionText: 'Choisir la bonne réponse',
          id: questionUuid2,
          imageUri: '',
        }, {
          correctAnswers: ['bonne réponse'],
          otherAnswers: ['non', 'incorrect'],
          type: QuestionEnum.OBSERVE_AND_IDENTIFY,
          name: 'Question autogénerée3',
          questionText: 'Choisir la bonne réponse',
          id: questionUuid3,
          imageUri: '',
        }, {
          correctAnswers: ['bonne réponse'],
          otherAnswers: ['non', 'incorrect'],
          type: QuestionEnum.TYPE_IN_BROKEN_SENTENCES,
          name: 'Question autogénerée4',
          questionText: 'Choisir la bonne réponse',
          id: questionUuid4,
          imageUri: '',
        }],
      }, {
        id: lessonUuid2,
        name: 'Lesson autogénerée 2',
        questions: [{
          correctAnswers: ['bonne réponse'],
          otherAnswers: ['non', 'incorrect'],
          type: QuestionEnum.MULTIPLE_CHOICES,
          name: 'Question autogénerée 5',
          questionText: 'Choisir la bonne réponse',
          id: questionUuid5,
          imageUri: '',
        }],
      }],
      name: 'unité autogénerée',
      hintUri: '',
    }],
  }],
  publishedSections: [{
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
        }, {
          correctAnswers: ['bonne réponse'],
          otherAnswers: ['non', 'incorrect'],
          type: QuestionEnum.FILL_IN_BROKEN_SENTENCES,
          name: 'Question autogénerée2',
          questionText: 'Choisir la bonne réponse',
          id: questionUuid2,
          imageUri: '',
        }, {
          correctAnswers: ['bonne réponse'],
          otherAnswers: ['non', 'incorrect'],
          type: QuestionEnum.OBSERVE_AND_IDENTIFY,
          name: 'Question autogénerée3',
          questionText: 'Choisir la bonne réponse',
          id: questionUuid3,
          imageUri: '',
        }, {
          correctAnswers: ['bonne réponse'],
          otherAnswers: ['non', 'incorrect'],
          type: QuestionEnum.TYPE_IN_BROKEN_SENTENCES,
          name: 'Question autogénerée4',
          questionText: 'Choisir la bonne réponse',
          id: questionUuid4,
          imageUri: '',
        }],
      }, {
        id: lessonUuid2,
        name: 'Lesson autogénerée 2',
        questions: [{
          correctAnswers: ['bonne réponse'],
          otherAnswers: ['non', 'incorrect'],
          type: QuestionEnum.MULTIPLE_CHOICES,
          name: 'Question autogénerée 5',
          questionText: 'Choisir la bonne réponse',
          id: questionUuid5,
          imageUri: '',
        }],
      }],
      name: 'unité autogénerée',
      hintUri: '',
    }],
  }],
};

const course2 = {
  contributors: ['antonin4384@gmail.com'],
  courseNumber: 'MTH8755',
  courseTitle: 'Analytiques avancés',
  details: '',
  password: '',
  tags: ['analytiques', 'mock', 'data++'],
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/gapris-6b7d5.appspot.com/o/chaise.jpg?alt=media&token=67014a8f-b397-4016-bc07-71d1f07487db',
  savedSections: [{
    controlPoint: {
      id: c2CPUuid,
      name: 'ControlPoint',
      questions: [{
        correctAnswers: ['bonne réponse'],
        otherAnswers: ['non', 'incorrect'],
        type: QuestionEnum.FILL_IN_BROKEN_SENTENCES,
        name: 'Question autogénerée2',
        questionText: 'Choisir la bonne réponse',
        id: c2QuestionUuid,
        imageUri: '',
      }, {
        correctAnswers: ['bonne réponse'],
        otherAnswers: ['non', 'incorrect'],
        type: QuestionEnum.OBSERVE_AND_IDENTIFY,
        name: 'Question autogénerée3',
        questionText: 'Choisir la bonne réponse',
        id: c2QuestionUuid2,
        imageUri: '',
      }, {
        correctAnswers: ['bonne réponse'],
        otherAnswers: ['non', 'incorrect'],
        type: QuestionEnum.TYPE_IN_BROKEN_SENTENCES,
        name: 'Question autogénerée4',
        questionText: 'Choisir la bonne réponse',
        id: c2QuestionUuid3,
        imageUri: '',
      }],
    },
    id: c2SectionsUuid,
    name: 'Section autogénerée',
    units: [{
      description: 'Description autogénerée',
      id: c2UnitUuid,
      lessons: [{
        id: c2LessonUuid,
        name: 'Lesson autogénerée',
        questions: [{
          correctAnswers: ['bonne réponse'],
          otherAnswers: ['non', 'incorrect'],
          type: QuestionEnum.MULTIPLE_CHOICES,
          name: 'Question autogénerée',
          questionText: 'Choisir la bonne réponse',
          id: c2QuestionUuid4,
          imageUri: '',
        }],
      }],
      name: 'unité autogénerée',
      hintUri: '',
    }],
  }],
  publishedSections: [{
    controlPoint: {
      id: c2CPUuid,
      name: 'ControlPoint',
      questions: [{
        correctAnswers: ['bonne réponse'],
        otherAnswers: ['non', 'incorrect'],
        type: QuestionEnum.FILL_IN_BROKEN_SENTENCES,
        name: 'Question autogénerée2',
        questionText: 'Choisir la bonne réponse',
        id: c2QuestionUuid,
        imageUri: '',
      }, {
        correctAnswers: ['bonne réponse'],
        otherAnswers: ['non', 'incorrect'],
        type: QuestionEnum.OBSERVE_AND_IDENTIFY,
        name: 'Question autogénerée3',
        questionText: 'Choisir la bonne réponse',
        id: c2QuestionUuid2,
        imageUri: '',
      }, {
        correctAnswers: ['bonne réponse'],
        otherAnswers: ['non', 'incorrect'],
        type: QuestionEnum.TYPE_IN_BROKEN_SENTENCES,
        name: 'Question autogénerée4',
        questionText: 'Choisir la bonne réponse',
        id: c2QuestionUuid3,
        imageUri: '',
      }],
    },
    id: c2SectionsUuid,
    name: 'Section autogénerée',
    units: [{
      description: 'Description autogénerée',
      id: c2UnitUuid,
      lessons: [{
        id: c2LessonUuid,
        name: 'Lesson autogénerée',
        questions: [{
          correctAnswers: ['bonne réponse'],
          otherAnswers: ['non', 'incorrect'],
          type: QuestionEnum.MULTIPLE_CHOICES,
          name: 'Question autogénerée',
          questionText: 'Choisir la bonne réponse',
          id: c2QuestionUuid4,
          imageUri: '',
        }],
      }],
      name: 'unité autogénerée',
      hintUri: '',
    }],
  }],
};
export enum EventType {
  COURSE, // between 4 and 6 inclusively
  CONTROLPOINT, // drag and drop between 2 to 6 words to the right hole
  LESSON, // drag drop between 2 to 6 words to the right hole
  QUESTION,
  SECTION,
  UNIT
}

export type EventAnalytics = {
  useremail: string;
  type: EventType;
  objectId: string;
  status: boolean;
  timestamp: number;
};
const analyticEventsC1 : EventAnalytics[] = [
  {
    useremail: 'user1@gmail.com',
    type: EventType.COURSE,
    objectId: courseId1,
    status: true,
    timestamp: new Date('2022-11-01T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.COURSE,
    objectId: courseId1,
    status: true,
    timestamp: new Date('2022-11-01T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user3@polymtl.ca',
    type: EventType.COURSE,
    objectId: courseId1,
    status: true,
    timestamp: new Date('2022-11-01T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user1@hotmail.com',
    type: EventType.COURSE,
    objectId: courseId1,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user4@yahoo.ca',
    type: EventType.COURSE,
    objectId: courseId1,
    status: true,
    timestamp: new Date('2022-11-06T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user5@yahoo.ca',
    type: EventType.COURSE,
    objectId: courseId1,
    status: true,
    timestamp: new Date('2022-11-08T02:00:00.000Z').getTime(),
  },
];
const analyticEventsC1S1 : EventAnalytics[] = [
  {
    useremail: 'user1@gmail.com',
    type: EventType.SECTION,
    objectId: sectionsUuid,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.SECTION,
    objectId: sectionsUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user3@polymtl.ca',
    type: EventType.SECTION,
    objectId: sectionsUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  },
];

const analyticEventsC1S1U1 : EventAnalytics[] = [
  {
    useremail: 'user1@gmail.com',
    type: EventType.UNIT,
    objectId: unitUuid,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.UNIT,
    objectId: unitUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user3@polymtl.ca',
    type: EventType.UNIT,
    objectId: unitUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user4@yahoo.ca',
    type: EventType.UNIT,
    objectId: unitUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  },
];

const analyticEventsC1S1U1L1 : EventAnalytics[] = [
  {
    useremail: 'user1@gmail.com',
    type: EventType.LESSON,
    objectId: lessonUuid,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.LESSON,
    objectId: lessonUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user3@polymtl.ca',
    type: EventType.LESSON,
    objectId: lessonUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user4@yahoo.ca',
    type: EventType.LESSON,
    objectId: lessonUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  },
  {
    useremail: 'user5@yahoo.ca',
    type: EventType.LESSON,
    objectId: lessonUuid,
    status: true,
    timestamp: new Date('2022-11-09T02:00:00.000Z').getTime(),
  },
];

const analyticEventsC1S1U1L2 : EventAnalytics[] = [
  {
    useremail: 'user1@gmail.com',
    type: EventType.LESSON,
    objectId: lessonUuid,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.LESSON,
    objectId: lessonUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user3@polymtl.ca',
    type: EventType.LESSON,
    objectId: lessonUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  },
];

const analyticEventsC1S1U1L1Q0 : EventAnalytics[] = [
  {
    useremail: 'user1@gmail.com',
    type: EventType.QUESTION,
    objectId: questionUuid,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user3@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user5@yahoo.ca',
    type: EventType.QUESTION,
    objectId: questionUuid,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user4@yahoo.ca',
    type: EventType.LESSON,
    objectId: questionUuid,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user1@gmail.com',
    type: EventType.QUESTION,
    objectId: questionUuid,
    status: false,
    timestamp: new Date('2022-11-01T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid,
    status: false,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  },
];

const analyticEventsC1S1U1L1Q1 : EventAnalytics[] = [
  {
    useremail: 'user1@gmail.com',
    type: EventType.QUESTION,
    objectId: questionUuid2,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid2,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user3@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid2,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user3@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid2,
    status: false,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user4@yahoo.ca',
    type: EventType.QUESTION,
    objectId: questionUuid2,
    status: true,
    timestamp: new Date('2022-11-01T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user5@yahoo.ca',
    type: EventType.LESSON,
    objectId: questionUuid2,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user5@yahoo.ca',
    type: EventType.LESSON,
    objectId: questionUuid2,
    status: false,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user5@yahoo.ca',
    type: EventType.LESSON,
    objectId: questionUuid2,
    status: false,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  },
];

const analyticEventsC1S1U1L1Q2 : EventAnalytics[] = [
  {
    useremail: 'user1@gmail.com',
    type: EventType.QUESTION,
    objectId: questionUuid3,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid3,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user3@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid3,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user5@yahoo.ca',
    type: EventType.QUESTION,
    objectId: questionUuid3,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user4@yahoo.ca',
    type: EventType.LESSON,
    objectId: questionUuid3,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user1@gmail.com',
    type: EventType.QUESTION,
    objectId: questionUuid3,
    status: false,
    timestamp: new Date('2022-11-01T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid3,
    status: false,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  },
];

const analyticEventsC1S1U1L1Q3 : EventAnalytics[] = [
  {
    useremail: 'user1@gmail.com',
    type: EventType.QUESTION,
    objectId: questionUuid4,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid4,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user3@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid4,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user5@yahoo.ca',
    type: EventType.QUESTION,
    objectId: questionUuid4,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user4@yahoo.ca',
    type: EventType.LESSON,
    objectId: questionUuid4,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user1@gmail.com',
    type: EventType.QUESTION,
    objectId: questionUuid4,
    status: false,
    timestamp: new Date('2022-11-01T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid4,
    status: false,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  },
];

const analyticEventsC1S1U1L2Q0 : EventAnalytics[] = [
  {
    useremail: 'user1@gmail.com',
    type: EventType.QUESTION,
    objectId: questionUuid5,
    status: true,
    timestamp: new Date('2022-11-02T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid5,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user3@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid5,
    status: true,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user1@gmail.com',
    type: EventType.QUESTION,
    objectId: questionUuid5,
    status: false,
    timestamp: new Date('2022-11-01T02:00:00.000Z').getTime(),
  }, {
    useremail: 'user2@polymtl.ca',
    type: EventType.LESSON,
    objectId: questionUuid5,
    status: false,
    timestamp: new Date('2022-11-03T02:00:00.000Z').getTime(),
  },
];

const getDummyAnalytics = https.onCall(
  async () => {
    // Request should contain all info necessary to add a Course to DB
    return { courses: [course, course2],
      events: analyticEventsC1.concat(analyticEventsC1S1,
        analyticEventsC1S1U1,
        analyticEventsC1S1U1L1,
        analyticEventsC1S1U1L2,
        analyticEventsC1S1U1L1Q0,
        analyticEventsC1S1U1L1Q1,
        analyticEventsC1S1U1L1Q2,
        analyticEventsC1S1U1L1Q3,
        analyticEventsC1S1U1L2Q0 ) };
  },
);

export default getDummyAnalytics;
