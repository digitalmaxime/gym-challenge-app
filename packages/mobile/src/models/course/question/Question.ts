/* eslint-disable semi */
import QuestionEnum from './QuestionEnum';

export default interface Question {
  id: string; // uuid4 generated for usage by Firebase and identification
  name: string; // secondary name for usage of ordering or identification
  type: QuestionEnum;

  questionText: string; // this is the question to be answered
  imageUri: string; // image from Firebase storage

  correctAnswers: string[]; // 1 to 4 possibilities for multiple choices
  otherAnswers: string[]; // 1 to 4 possibilities for multiple choices
}
