import React, { Dispatch, useState } from 'react';
import { FlatList, LogBox, StyleSheet, Text, View } from 'react-native';
import uuid from 'react-native-uuid';

import Colors from '../../../constants/styles';
import {
  BrokenSentence,
  HoleAnswer,
  PossibleAnswer,
  PressedAnswer,
} from '../../../models/course/lesson/LessonTypes';

import { ButtonQuestionText, ButtonText } from '../../basics/Buttons';

LogBox.ignoreAllLogs(); // Ignore log notification because wrapping around words is fine

export interface FillInBrokenSentenceProps {
  blocksOfWords: (BrokenSentence | HoleAnswer)[];
  holeAnswers: HoleAnswer[];
  possibleAnswers: PossibleAnswer[];
  setPossibleAnswers: Dispatch<React.SetStateAction<PossibleAnswer[]>>;
  handleAnswerPress: (selectedAnswer: PressedAnswer) => void;
  setParentHoleAnswers: Dispatch<React.SetStateAction<HoleAnswer[]>>;
  // isAnswerLocked: boolean;
}

function FillInBrokenSentence({
  blocksOfWords,
  holeAnswers,
  possibleAnswers,
  setPossibleAnswers,
  handleAnswerPress,
  setParentHoleAnswers,
}: FillInBrokenSentenceProps) {
  const [forceRefresh, setForceRefresh] = useState<boolean>(false);

  function renderBlockOfWords(itemData: any) {
    const { item } = itemData;

    if (item.hiddenCorrectAnswer !== undefined) {
      const hole = item as HoleAnswer;

      if (holeAnswers[hole.index].currentAnswer === '') {
        return (
          <ButtonText
            onPress={() => {}}
            textContent=""
            btnImgBackgroundColor={Colors.tinyOpacity}
            btnHeight={30}
            btnWidth={100}
            padding={0}
            disabled
          />
        );
      }
      return (
        <ButtonQuestionText
          onPress={() => {
            setPossibleAnswers([
              ...possibleAnswers,
              {
                uniqueID: uuid.v4() as string,
                possibleAnswer: holeAnswers[hole.index].currentAnswer,
              },
            ]);

            // remove value and button
            holeAnswers[hole.index].currentAnswer = '';
            setParentHoleAnswers(holeAnswers);
            setForceRefresh(!forceRefresh);
          }}
          textContent={holeAnswers[hole.index].currentAnswer}
          btnHeight={30}
          btnWidth={100}
          btnImgBackgroundColor={Colors.btnUnitBackgroundColor}
          padding={0}
          disabled={false}
          textFontSize={12}
        />
      );
    }
    const brokenSentence = item as BrokenSentence;
    return (
      <Text style={styles.brokenSentence}>{brokenSentence.brokenSentence}</Text>
    );
  }

  function renderPossibleAnswers(itemData: any) {
    const { item } = itemData;
    const possibleAnswer = item as PossibleAnswer;

    return (
      <ButtonQuestionText
        onPress={() => {
          let hasChanged = false;

          for (let i = 0; i < holeAnswers.length; i += 1) {
            if (holeAnswers[i].currentAnswer === '') {
              holeAnswers[i].currentAnswer = possibleAnswer.possibleAnswer;
              setParentHoleAnswers(holeAnswers);
              i = holeAnswers.length;
              hasChanged = true;
            }
          }
          if (hasChanged) {
            handleAnswerPress({
              uniqueID: uuid.v4() as string,
              pressedAnswer: possibleAnswer.possibleAnswer,
            });
            setPossibleAnswers(
              possibleAnswers.filter(
                el => el.possibleAnswer !== possibleAnswer.possibleAnswer,
              ),
            );
          }

          return [];
        }}
        textContent={possibleAnswer.possibleAnswer}
        btnHeight={40}
        btnWidth={90}
        btnImgBackgroundColor={Colors.btnUnitBackgroundColor}
        padding={0}
        disabled={false}
        textFontSize={12}
      />
    );
  }

  return (
    <View style={{ alignContent: 'center', alignItems: 'center' }}>
      <View style={[styles.blocksOfWordsContainer, { height: '30%', marginBottom: 20 }]}>

        <FlatList
          contentContainerStyle={styles.blocksOfWords}
          data={blocksOfWords}
          renderItem={renderBlockOfWords}
          keyExtractor={item => item.uniqueID}
          extraData={forceRefresh}
        />
      </View>
      <View style={{ height: '40%', borderWidth: 3 }}>
        <FlatList
          data={possibleAnswers}
          renderItem={renderPossibleAnswers}
          keyExtractor={item => item.uniqueID}
        />
      </View>
    </View>
  );
}

export default FillInBrokenSentence;

const styles = StyleSheet.create({
  blocksOfWordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '90%',
    margin: 10,
    padding: 0,
  },
  blocksOfWords: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',

    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 5,
    borderColor: '#718096',
  },
  holeContainer: {
    paddingBottom: 0,
    marginBottom: 0,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#2D3748',
    paddingHorizontal: 10,
    borderStyle: 'solid',
  },
  hole: {
    color: 'transparent',
    fontSize: 16,
  },
  brokenSentence: { fontSize: 16, marginBottom: 10 },
});
