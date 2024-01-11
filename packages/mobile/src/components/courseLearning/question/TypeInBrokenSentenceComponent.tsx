import React, { Dispatch, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { BrokenSentence, HoleAnswer } from '../../../models/course/lesson/LessonTypes';

export interface TypeInBrokenSentenceProps {
  blocksOfWords: (BrokenSentence | HoleAnswer)[];
  holeAnswers: HoleAnswer[];
  setParentHoleAnswers: Dispatch<React.SetStateAction<HoleAnswer[]>>;
  setHasAnswered: Dispatch<React.SetStateAction<boolean>>;
}

function TypeInBrokenSentence({
  blocksOfWords,
  holeAnswers,
  setParentHoleAnswers,
  setHasAnswered,
}: TypeInBrokenSentenceProps) {
  const [forceRefresh, setForceRefresh] = useState<boolean>(false);

  function renderBlockOfWords(itemData: any) {
    const { item } = itemData;

    if (item.hiddenCorrectAnswer !== undefined) {
      const hole = item as HoleAnswer;

      return (
        <View style={styles.holeContainer}>
          <TextInput
            style={styles.hole}
            onChangeText={(text: string) => {
              holeAnswers[hole.index].currentAnswer = text;
              setParentHoleAnswers(holeAnswers);
              setForceRefresh(!forceRefresh);

              setHasAnswered(true);
            }}
            value={holeAnswers[hole.index].currentAnswer}
            autoFocus
          />
        </View>
      );
    }
    const brokenSentence = item as BrokenSentence;
    return (
      <Text style={styles.brokenSentence}>{brokenSentence.brokenSentence}</Text>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.blocksOfWords}
      data={blocksOfWords}
      renderItem={renderBlockOfWords}
      keyExtractor={item => item.uniqueID}
      extraData={forceRefresh}
    />
  );
}

export default TypeInBrokenSentence;

const styles = StyleSheet.create({
  questionText: {
    width: '80%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  blocksOfWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '80%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 5,
    borderColor: '#718096',
  },
  holeContainer: {
    paddingBottom: 2,
    marginBottom: 10,

    borderBottomWidth: 2,
    borderBottomColor: '#2D3748',
    paddingHorizontal: 10,
    borderStyle: 'solid',

    minWidth: 100,
  },
  hole: {
    color: 'black',
    fontSize: 16,
  },
  brokenSentence: { fontSize: 16, marginBottom: 10 },
});
