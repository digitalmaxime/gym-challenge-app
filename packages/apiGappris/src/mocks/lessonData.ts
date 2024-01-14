/* eslint-disable max-len */
import Lesson from '../models/course/Lesson';
import { MultipleChoicesQuestion, ObserveAndIdentifyQuestion } from '../models/course/question/Question';
import QuestionEnum from '../models/course/question/QuestionEnum';

const lesson1: Lesson = {
  id: 's1$u1$l1',
  name: 'examen formatif sur les chats',
  questions: [
    {
      id: 's1$u1$l1$q1',
      name: 'question chat',
      type: QuestionEnum.OBSERVE_AND_IDENTIFY,
      questionText: 'Identifier caracteristique d\'un chat',
      imageUri: 'https://firebasestorage.googleapis.com/v0/b/gapris-6b7d5.appspot.com/o/un_chat.png?alt=media&token=432065ca-be0d-46cb-acc6-83586a0bd3c2',
      otherAnswers: [],
      correctAnswers: [
        'Beau',
        'Adorable',
        'Haïssable',
        'Indépendant',
      ],
      observeImageUri:
          'https://firebasestorage.googleapis.com/v0/b/gapris-6b7d5.appspot.com/o/un_chat.png?alt=media&token=432065ca-be0d-46cb-acc6-83586a0bd3c2',
    } as ObserveAndIdentifyQuestion,
    {
      id: 's1$u1$l1$q2',
      name: 'question Pingouin',
      type: QuestionEnum.OBSERVE_AND_IDENTIFY,
      questionText: 'S\'agit-il d\'un pingouin ou d\'un manchot? ',
      imageUri: 'https://firebasestorage.googleapis.com/v0/b/gapris-6b7d5.appspot.com/o/pingouin-manchot.png?alt=media&token=ce44a12a-749e-4b45-b91f-771bebacab3a',
      otherAnswers: ['pingouin'],
      correctAnswers: [
        'manchot',
      ],
      observeImageUri:
          'https://firebasestorage.googleapis.com/v0/b/gapris-6b7d5.appspot.com/o/pingouin-manchot.png?alt=media&token=ce44a12a-749e-4b45-b91f-771bebacab3a',
    } as ObserveAndIdentifyQuestion,
    {
      id: 's1$u1$l1$q3',
      name: 'question manchot',
      type: QuestionEnum.MULTIPLE_CHOICES,
      questionText: 'Identifier les differentes especes de manchot',
      imageUri: '',
      otherAnswers: ['Manchot noir', 'Manchot volant'],
      correctAnswers: [
        'Manchot empereur',
        'Manchot royal',
        'Manchot pygmée',
      ],
    } as MultipleChoicesQuestion,
    {
      id: 's1$u1$l1$q4',
      name: 'question manchots volent',
      type: QuestionEnum.MULTIPLE_CHOICES,
      questionText: 'Les pingouins savent-ils voler',
      imageUri: '',
      otherAnswers: ['non', 'peut-etre..'],
      correctAnswers: [
        'oui',
      ],
    } as MultipleChoicesQuestion,
  ],
};

const lesson2: Lesson = {
  id: 's1$u1$l2',
  name: 'examen formatif sur la royauté',
  questions: [
    {
      id: 's1$u1$l2$q1',
      name: 'question Qc',
      type: QuestionEnum.MULTIPLE_CHOICES,
      questionText: 'Qui est le Premier Ministre du Québec?',
      imageUri: 'test',
      otherAnswers: [
        'Gabriel Nadeau-Dubois',
        'Éric Duhaime',
        'Dominique Anglade',
      ],
      correctAnswers: ['François Legault'],
    },
  ],
};

const lesson3: Lesson = {
  id: 's1$u1$l3',
  name: 'Lion',
  questions: [
    {
      id: 's1$u1$l3$q1',
      name: 'question 1',
      type: QuestionEnum.MULTIPLE_CHOICES,
      questionText: 'Que fait le lion?',
      imageUri: 'test',
      otherAnswers: ['il mugit', 'il meugle'],
      correctAnswers: ['il rugit'],
    },
  ] as MultipleChoicesQuestion[],
};

const lesson4: Lesson = {
  id: 's1$u1$l4',
  name: 'Girafe',
  questions: [
    {
      id: 's1$u1$l4$q1',
      name: 'question 1',
      type: QuestionEnum.MULTIPLE_CHOICES,
      questionText: 'Comment se nomme le petit de la girafe?',
      imageUri: 'test',
      otherAnswers: ['la gifette', 'le girafou'],
      correctAnswers: ['le girafeau'],
    },
  ] as MultipleChoicesQuestion[],
};

const lesson5: Lesson = {
  id: 's1$u1$l5',
  name: 'Carcajou',
  questions: [
    {
      id: 's1$u1$l5$q1',
      name: 'question 1',
      type: QuestionEnum.MULTIPLE_CHOICES,
      questionText: 'Comment nomme-t-on egalement le carcajou?',
      imageUri: 'test',
      otherAnswers: ['Wolve'],
      correctAnswers: ['gulo gulo', 'glouton', 'wolverine'],
    },
  ] as MultipleChoicesQuestion[],
};

const lesson6: Lesson = {
  id: 's1$u2$l1',
  name: 'Licorne',
  questions: [
    {
      id: 's1$u2$l1$q1',
      name: 'question 1',
      type: QuestionEnum.MULTIPLE_CHOICES,
      questionText: 'Combien de corne(s) possède une licorne?',
      imageUri: 'test',
      otherAnswers: ['deux', 'trois'],
      correctAnswers: ['une seule'],
    },
  ] as MultipleChoicesQuestion[],
};


export { lesson1, lesson2, lesson3, lesson4, lesson5, lesson6 };
