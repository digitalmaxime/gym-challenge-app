import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import Colors from '../../../constants/styles';
import PossibleAnswersComponent from './PossibleAnswersComponent';
import Question from '../../../models/course/question/Question';
import {
  PossibleAnswer,
  PressedAnswer,
} from '../../../models/course/lesson/LessonTypes';

interface MultipleChoicesProps {
  question: Question;
  isAnswerLocked: boolean;
  possibleAnswers: PossibleAnswer[];
  handleAnswerPress: (selectedAnswer: PressedAnswer) => void;
  pressedAnswers: PressedAnswer[];
}

function MultipleChoices({
  question,
  isAnswerLocked,
  possibleAnswers,
  handleAnswerPress,
  pressedAnswers,
}: MultipleChoicesProps) {
  const [isImageValid, setIsImageValid] = useState<boolean>(true);

  return (
    <>
      <Text style={styles.question}>{question.questionText}</Text>
      {(!!question.imageUri && isImageValid) && (
        <Image
          style={styles.observeImage}
          source={{ uri: question.imageUri }}
          onError={() => setIsImageValid(false)}
        />
      )}
      <View style={styles.possibleAnswersContainer}>
        <PossibleAnswersComponent
          isAnswerLocked={isAnswerLocked}
          possibleAnswers={possibleAnswers}
          handleAnswerPress={handleAnswerPress}
          pressedAnswers={pressedAnswers}
        />
      </View>
    </>
  );
}

export default MultipleChoices;

const styles = StyleSheet.create({
  possibleAnswersContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  observeImage: {
    marginTop: 20,
    height: '20%',
    width: '80%',
    resizeMode: 'center',
  },
  question: {
    fontSize: 20,
    margin: 15,
    color: Colors.textLessonColor,
  },
});
