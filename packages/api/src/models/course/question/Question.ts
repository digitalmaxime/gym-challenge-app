/* eslint-disable max-len */
import QuestionEnum from './QuestionEnum';
import { firestore } from 'firebase-admin';

type Question = {
  id: string; // db

  name: string; // 50 c

  type: QuestionEnum;

  // eslint-disable-next-line max-len
  questionText: string; // TODO: maybe something else if there is mathematical formula

  imageUri: string; //

  // eslint-disable-next-line max-len
  otherAnswers: string[]; // other contient les réponses qui ne sont pas valides.
  correctAnswers: string[]; // réponses (pt) en ordre si nécessaire

  // La combinaison de ces deux arrays seront disponibles aux clients
  // Les bounds ci dessous s'appliquent à la combinaisons des deux arrays.
  // eslint-disable-next-line max-len
  // Si on est dans un cas ou l'odre est important. L'ordre est uniquement important dans correct answers
  // 2 - 6 possibilities (cm), 5-10 (ob), 1-12 (pt), (entrer mots) 2-6

  // eslint-disable-next-line max-len
  // Mobile devrait toujorus SHUFFLED les positisons des réponses (quand applicable)
};
export type MultipleChoicesQuestion = Question

export interface FillInSentenceQuestion extends Question {
  blocksOfWords: string[]; // word missing between each blocks of words
}

export type TypeInSentenceQuestion = Question

export interface ObserveAndIdentifyQuestion extends Question {
  observeImageUri: string; // Firebase Storage URL
}

export type PriorityQueueQuestion = {
  id: string; // Contains section,unit,lesson,questionID

  spacingExponentialFactor: number; // Used to calculate question's priority
  // Used to find the date when a question should be expected to be given back to the user
  // lastCompleted + (spacingExponentialFactor^2)*(1 Day)

  lastCompleted: firestore.Timestamp; // Date obtained from Firestore
  // Represents the last time this question was answered

  priority: number; // Value with which the priority queue is ordered
  // Formula:
  // CurrentDate(Number of Days) - (lastCompleted + (spacingExponentialFactor^2)*(1 Day))
}

export type FailedQuestion = {
  id: string;
}

export default Question;
