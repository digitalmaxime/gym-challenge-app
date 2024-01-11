import React, { Dispatch } from 'react';
import { StyleSheet, View, Text, FlatList, Image, ScrollView } from 'react-native';
import uuid from 'react-native-uuid';

import Colors from '../../../constants/styles';
import {
  PossibleAnswer,
  PressedAnswer,
} from '../../../models/course/lesson/LessonTypes';
import Question from '../../../models/course/question/Question';
import { ButtonQuestionText } from '../../basics/Buttons';

interface ObserveAndIdentifyProps {
  question: Question;
  observeImageUri: string;
  possibleAnswers: PossibleAnswer[];
  pressedAnswers: PressedAnswer[];
  setPressedAnswers: Dispatch<React.SetStateAction<PressedAnswer[]>>;
  setPossibleAnswers: Dispatch<React.SetStateAction<PossibleAnswer[]>>;
  // isAnswerLocked: boolean;
}

function ObserveAndIdentify({
  question,
  observeImageUri,
  possibleAnswers,
  pressedAnswers,
  setPressedAnswers,
  setPossibleAnswers,
}: // isAnswerLocked,
ObserveAndIdentifyProps) {
  function renderObserveImageRectangle(itemData: any) {
    const { item } = itemData;
    const pressedAnswer = item as PressedAnswer;

    return (
      <ButtonQuestionText
        onPress={() => {
          setPressedAnswers(
            pressedAnswers.filter(
              el => el.pressedAnswer !== pressedAnswer.pressedAnswer,
            ),
          );
          setPossibleAnswers([
            ...possibleAnswers,
            {
              uniqueID: uuid.v4() as string,
              possibleAnswer: pressedAnswer.pressedAnswer,
            },
          ]);
        }}
        textContent={pressedAnswer.pressedAnswer}
        btnHeight={40}
        btnWidth={90}
        btnImgBackgroundColor={Colors.btnUnitBackgroundColor}
        padding={0}
        disabled={false}
        textFontSize={12}
      />
    );
  }
  function renderObserveImageChoices(itemData: any): JSX.Element {
    const { item } = itemData;
    const possibleAnswer = item as PossibleAnswer;

    return (
      <ButtonQuestionText
        onPress={() => {
          setPressedAnswers([
            ...pressedAnswers,
            {
              uniqueID: uuid.v4() as string,
              pressedAnswer: possibleAnswer.possibleAnswer,
            },
          ]);
          setPossibleAnswers(
            possibleAnswers.filter(
              el => el.possibleAnswer !== possibleAnswer.possibleAnswer,
            ),
          );
        }}
        textContent={possibleAnswer.possibleAnswer}
        textFontSize={12}
        btnHeight={40}
        btnWidth={90}
        btnImgBackgroundColor={Colors.btnUnitBackgroundColor}
        padding={0}
        disabled={false}
      />
    );
  }

  return (
    <>
      <Text style={styles.observeTitleText}>{question.questionText}</Text>
        {observeImageUri !== '' && (
          <Image style={styles.observeImage} source={{ uri: observeImageUri }} />
        )}
        <View style={styles.observeImageRectangle}>
          <FlatList
            contentContainerStyle={{ justifyContent: 'center' }}
            data={pressedAnswers}
            renderItem={renderObserveImageRectangle}
            keyExtractor={item => item.uniqueID}
            numColumns={3}
          />
        </View>
        <View style={styles.possibleAnswersContainer}>
          <FlatList
            contentContainerStyle={{ justifyContent: 'center' }}
            data={possibleAnswers}
            renderItem={renderObserveImageChoices}
            keyExtractor={item => item.uniqueID}
            numColumns={3}
          />
        </View>
    </>
  );
}

export default ObserveAndIdentify;

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    margin: 15,
    color: Colors.textLessonColor,
  },
  observeTitleText: {
    width: '80%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  observeImage: {
    marginTop: 10,
    width: 300,
    height: 180,
    resizeMode: 'contain',
  },
  observeImageRectangle: {
    marginTop: 20,
    height: '18%',
    minWidth: '82%',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#718096',
    borderRadius: 5,
  },
  possibleAnswersContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
