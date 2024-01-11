/* eslint-disable max-len */
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ButtonText } from '../../basics/Buttons';
import Colors from '../../../constants/styles';
import CheckAnswerAnimatedBtn from '../../basics/ButtonsAnimated';
import Lesson from '../../../models/course/lesson/Lesson';

interface CheckBtnComponentProps {
  isCurrentQuestionCompleted: boolean;
  isCurrentQuestionSuccess: boolean;
  currentLesson: Lesson;
  handleCheckPress: () => boolean;
  endLesson: () => void;
  goToNextQuestion: () => boolean;
  hasAnswered: boolean;
}

function CheckBtnComponent({
  isCurrentQuestionCompleted,
  handleCheckPress,
  isCurrentQuestionSuccess,
  currentLesson,
  endLesson,
  goToNextQuestion,
  hasAnswered,
}: CheckBtnComponentProps) {
  const [isTerminerPress, setIsTerminerPress] = useState(false);
  return (
    <View style={styles.checkContainer}>
      {!isCurrentQuestionCompleted && (
        <>
          <Text> </Text>
          <CheckAnswerAnimatedBtn
            disabled={!hasAnswered}
            onPress={handleCheckPress}
            textContent={isCurrentQuestionSuccess ? 'BRAVO!' : 'CONFIRMER'}
            btnHeight={60}
            btnWidth={200}
            btnImgBackgroundColor={
              isCurrentQuestionSuccess
                ? Colors.success
                : Colors.btnTextBackgroundColor
            }
          />
        </>
      )}
      {isCurrentQuestionCompleted && isCurrentQuestionSuccess && (
        <View style={styles.goToNextQuestionContainer}>
          <Text style={{ color: Colors.success, fontWeight: 'bold' }}>Bravo!</Text>
          <ButtonText
            onPress={() => {
              if (currentLesson.questions.length === 0) {
                endLesson();
                setIsTerminerPress(true);
              } else {
                goToNextQuestion();
              }
            }
            }
            textContent={
              currentLesson.questions.length === 0 ? 'Terminer' : 'CONTINUER'
            }
            btnHeight={60}
            btnWidth={200}
            btnImgBackgroundColor={Colors.success}
            padding={0}
            disabled={isTerminerPress}
          />
        </View>
      )}
      {isCurrentQuestionCompleted && !isCurrentQuestionSuccess && (
        <View style={styles.goToNextQuestionContainer}>
          <Text style={{ color: Colors.fail, fontSize: 14 }}>
            mauvaise réponse..
          </Text>
          <ButtonText
            onPress={goToNextQuestion}
            textContent="CONTINUER"
            btnHeight={60}
            btnWidth={200}
            btnImgBackgroundColor={Colors.fail}
            disabled={false}
            padding={0}
          />
        </View>
      )}
    </View>
  );
}

export default CheckBtnComponent;

const styles = StyleSheet.create({
  checkContainer: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goToNextQuestionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
