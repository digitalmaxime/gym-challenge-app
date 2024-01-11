import Course from '../models/course/Course';
import { lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5 } from './lessonData';

const courseCIV1000: Course = {
  id: '8957f37d-d196-47d5-a57a-5141fdfd0d9d',
  courseNumber: 'CIV1000',
  courseTitle: 'Introduction au génie civil',
  contributors: [],
  details: 'Premier cours sur les bases de la mécanique statique',
  imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/gapris-6b7d5.appspot.com/o/luca-onniboni-bUpwY7EdrlQ-unsplash.jpg?alt=media&token=4f72603f-e268-4604-9bad-b7796f8ddec2',
  password: '',
  tags: ['corruption', 'facile'],
  savedSections: [
    {
      id: 's1',
      name: 'Introduction aux ponts',
      units: [
        {
          id: 's1$u1',
          name: 'unit1',
          description: 'L\'unité sur les 1',
          hintUri: 'should just go for it!',
          lessons: [lesson1],
        },
      ],
      controlPoint: null,
    },
  ],
  publishedSections: [
    {
      id: 's1',
      name: 'Introduction aux ponts',
      units: [
        {
          id: 's1$u1',
          name: 'unit1',
          description: 'L\'unité sur les 1',
          hintUri: 'should just go for it!',
          lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
        },
      ],
      controlPoint: null,
    },
  ],
};

const coursePHS1001: Course = {
  id: 'f65e3b82-6683-11ed-9022-0242ac120002',
  courseNumber: 'PHS1001',
  courseTitle: 'Introduction Physique',
  contributors: [],
  details: 'Premier cours sur les bases de la mécanique',
  imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/gapris-6b7d5.appspot.com/o/prisme1.jpg?alt=media&token=546f4e21-b0f5-46ce-879c-e4a4ef6f3b6c',
  password: '12345678',
  tags: ['chomage', 'difficile', 'Planck'],
  savedSections: [
    {
      id: 's1',
      name: 'Introduction aux laser',
      units: [
        {
          id: 's1$u1',
          name: 'unit1',
          description: 'L\'unité sur les 1',
          hintUri: 'should just go for it!',
          lessons: [lesson1],
        },
      ],
      controlPoint: null,
    },
  ],
  publishedSections: [
    {
      id: 's1',
      name: 'Introduction aux laser',
      units: [
        {
          id: 's1$u1',
          name: 'unit1',
          description: 'L\'unité sur les 1',
          hintUri: 'should just go for it!',
          lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
        },
      ],
      controlPoint: null,
    },
  ],
};


export { courseCIV1000, coursePHS1001 };
