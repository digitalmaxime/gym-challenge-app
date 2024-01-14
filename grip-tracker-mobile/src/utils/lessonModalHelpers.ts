/* eslint-disable max-len */
import { Dispatch, SetStateAction } from 'react';
import uuid from 'react-native-uuid';

import {
  BrokenSentence,
  HoleAnswer,
  PossibleAnswer,
  PressedAnswer,
} from '../models/course/lesson/LessonTypes';
import Question from '../models/course/question/Question';

export function getNbOfCompletedLessons(unitId: string, progress?: {[key: string]: {[isCompleted: string]: boolean}}) {
  try {
    if (!progress) return 0;

    let nbOfCompletedLessons = 0;

    Object.keys(progress).forEach(key => {
      if (key.includes(unitId)) {
        if (progress[key]?.isCompleted) {
          nbOfCompletedLessons += 1;
        }
      }
    });

    return nbOfCompletedLessons;
  } catch (error) {
    const message = (error instanceof Error) ? error.message : String(error);
    console.error({ message });
    console.warn('failed to getNbOfCompletedLessons..');
    return 0;
  }
}

export function shuffleList(unshuffledList: any[]) {
  const shuffledList = unshuffledList
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffledList;
}

export default function createPossibleAnswersArray(
  question: Question,
): PossibleAnswer[] {
  const allAnswers = shuffleList(question.correctAnswers?.concat(question.otherAnswers));

  const possibleAnswers: PossibleAnswer[] = [];

  allAnswers.forEach(answer => {
    possibleAnswers.push({
      uniqueID: uuid.v4() as string,
      possibleAnswer: answer,
    });
  });

  return possibleAnswers;
}

export function checkMultipleChoiceAnswer(pressedAnswers: PressedAnswer[], currentQuestion: Question) {
  const a = pressedAnswers.sort((x, y) =>
    x.pressedAnswer.localeCompare(y.pressedAnswer),
  );
  const b = currentQuestion.correctAnswers.sort((x, y) =>
    x.localeCompare(y),
  );

  let isQuestionAnsweredCorrectly = true;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i].pressedAnswer !== b[i]) {
      isQuestionAnsweredCorrectly = false;
      i = a.length;
    }
  }
  if (a.length !== b.length) {
    isQuestionAnsweredCorrectly = false;
  }

  return isQuestionAnsweredCorrectly;
}

export function checkBrokenSentenceAnswer(holeAnswers: HoleAnswer[]) {
  let isQuestionAnsweredCorrectly = true;

  holeAnswers.forEach((holeAnswer: HoleAnswer) => {
    if (holeAnswer.currentAnswer.toLowerCase() !== holeAnswer.hiddenCorrectAnswer.toLowerCase()) {
      isQuestionAnsweredCorrectly = false;
    }
  });

  return isQuestionAnsweredCorrectly;
}

export function parseBrokenQuestion(
  question: Question,
  setBlocks: Dispatch<SetStateAction<(BrokenSentence | HoleAnswer)[]>>,
  setHoleAnswers: Dispatch<React.SetStateAction<HoleAnswer[]>>,
) {
  const splitted: string[] = question.questionText.split('$_$');
  const blocksOfWords: (BrokenSentence | HoleAnswer)[] = [];

  let indexCorrectAnswers = 0;

  const holeAnswers: HoleAnswer[] = [];

  for (let i = 0; i < splitted.length - 1; i += 1) {
    if (splitted[i] !== '') {
      blocksOfWords.push({
        uniqueID: uuid.v4() as string,
        brokenSentence: splitted[i],
      });
    }
    blocksOfWords.push({
      uniqueID: uuid.v4() as string,
      index: indexCorrectAnswers,
      currentAnswer: '',
      hiddenCorrectAnswer: question.correctAnswers[indexCorrectAnswers],
    });
    holeAnswers.push({
      uniqueID: uuid.v4() as string,
      index: indexCorrectAnswers,
      currentAnswer: '',
      hiddenCorrectAnswer: question.correctAnswers[indexCorrectAnswers],
    });
    indexCorrectAnswers += 1;
  }
  if (splitted[splitted.length - 1] !== '') {
    blocksOfWords.push({
      uniqueID: uuid.v4() as string,
      brokenSentence: splitted[splitted.length - 1],
    });
  }

  setBlocks(blocksOfWords);
  setHoleAnswers(holeAnswers);
}

export function parseBrokenQuestionBlocks(question: Question): (BrokenSentence | HoleAnswer)[] {
  const splitted: string[] = question.questionText.split('$_$');
  const blocksOfWords: (BrokenSentence | HoleAnswer)[] = [];

  let indexCorrectAnswers = 0;

  const holeAnswers: HoleAnswer[] = [];

  for (let i = 0; i < splitted.length - 1; i += 1) {
    if (splitted[i] !== '') {
      blocksOfWords.push({
        uniqueID: uuid.v4() as string,
        brokenSentence: splitted[i],
      });
    }
    blocksOfWords.push({
      uniqueID: uuid.v4() as string,
      index: indexCorrectAnswers,
      currentAnswer: '',
      hiddenCorrectAnswer: question.correctAnswers[indexCorrectAnswers],
    });
    holeAnswers.push({
      uniqueID: uuid.v4() as string,
      index: indexCorrectAnswers,
      currentAnswer: '',
      hiddenCorrectAnswer: question.correctAnswers[indexCorrectAnswers],
    });
    indexCorrectAnswers += 1;
  }
  if (splitted[splitted.length - 1] !== '') {
    blocksOfWords.push({
      uniqueID: uuid.v4() as string,
      brokenSentence: splitted[splitted.length - 1],
    });
  }

  return blocksOfWords;
}

export function parseBrokenQuestionHoleAnswers(question: Question): HoleAnswer[] {
  const splitted: string[] = question.questionText.split('$_$');
  const blocksOfWords: (BrokenSentence | HoleAnswer)[] = [];

  let indexCorrectAnswers = 0;

  const holeAnswers: HoleAnswer[] = [];

  for (let i = 0; i < splitted.length - 1; i += 1) {
    if (splitted[i] !== '') {
      blocksOfWords.push({
        uniqueID: uuid.v4() as string,
        brokenSentence: splitted[i],
      });
    }
    blocksOfWords.push({
      uniqueID: uuid.v4() as string,
      index: indexCorrectAnswers,
      currentAnswer: '',
      hiddenCorrectAnswer: question.correctAnswers[indexCorrectAnswers],
    });
    holeAnswers.push({
      uniqueID: uuid.v4() as string,
      index: indexCorrectAnswers,
      currentAnswer: '',
      hiddenCorrectAnswer: question.correctAnswers[indexCorrectAnswers],
    });
    indexCorrectAnswers += 1;
  }
  if (splitted[splitted.length - 1] !== '') {
    blocksOfWords.push({
      uniqueID: uuid.v4() as string,
      brokenSentence: splitted[splitted.length - 1],
    });
  }

  return holeAnswers;
}
