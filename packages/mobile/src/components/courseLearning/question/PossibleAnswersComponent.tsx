/* eslint-disable max-len */
import React from 'react';
import { View, FlatList } from 'react-native';
import uuid from 'react-native-uuid';

import { ButtonText } from '../../basics/Buttons';
import Colors from '../../../constants/styles';
import {
  PossibleAnswer,
  PressedAnswer,
} from '../../../models/course/lesson/LessonTypes';

interface PossibleAnswersComponentProps {
  isAnswerLocked: boolean;
  handleAnswerPress: (selectedAnswer: PressedAnswer) => void;
  possibleAnswers: PossibleAnswer[];
  pressedAnswers: PressedAnswer[];
}

function PossibleAnswersComponent({
  isAnswerLocked,
  possibleAnswers,
  handleAnswerPress,
  pressedAnswers,
}: PossibleAnswersComponentProps) {
  function doesPressedAnswersHasPossibleAnswer(possibleAnswer: PossibleAnswer) {
    for (let i = 0; i < pressedAnswers.length; i += 1) {
      if (pressedAnswers[i].pressedAnswer === possibleAnswer.possibleAnswer) {
        return Colors.activeIcon;
      }
    }
    return Colors.cardBackgroundColor;
  }

  function renderCourseItem(itemData: any) {
    const possibleAnswer: PossibleAnswer = itemData.item;
    if (possibleAnswer.possibleAnswer) {
      return (
        <ButtonText
          onPress={() =>
            handleAnswerPress({
              uniqueID: uuid.v4() as string,
              pressedAnswer: possibleAnswer.possibleAnswer,
            })
          }
          textContent={possibleAnswer.possibleAnswer}
          btnImgBackgroundColor={doesPressedAnswersHasPossibleAnswer(
            possibleAnswer,
          )}
          btnHeight={undefined}
          btnWidth={300}
          padding={14}
          disabled={isAnswerLocked}
        />
      );
    }
    return <View />;
  }

  return (
    <View style={{ opacity: isAnswerLocked ? 0.3 : 1 }}>
      <FlatList
        data={possibleAnswers}
        keyExtractor={item => item.uniqueID}
        numColumns={1}
        bounces={false}
        renderItem={renderCourseItem}
      />
    </View>
  );
}

export default PossibleAnswersComponent;
