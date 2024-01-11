/* eslint-disable max-len */
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../../constants/styles';
import Chevron from './ChevronStartLesson';
import { ButtonIcon } from '../../basics/Buttons';
import Lesson from '../../../models/course/lesson/Lesson';
import { useUserContext } from '../../../contexts/UserContext';
import LessonStatus from '../lesson/LessonEnum';

type RootStackParamList = {
  HintScreen: {hintText: string}
};

type BeginUnitMenuProps = {
    startLesson: (index: number) => void;
    hintText: string;
    lessons: Lesson[]
}

export default function BeginUnitMenu({ startLesson, hintText, lessons }: BeginUnitMenuProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const userContext = useUserContext();
  let previousLessonProgress: {[isCompleted: string]: boolean} | undefined;

  function showHint() {
    navigation.navigate<'HintScreen'>('HintScreen', { hintText });
  }

  function renderLessonPreview(itemData: any) {
    const lesson: Lesson = itemData.item;
    const lessonProgress = userContext.currentCourseProgress?.progress[lesson.id];

    let lessonStatus: LessonStatus;
    if (lessonProgress?.isCompleted) {
      lessonStatus = LessonStatus.DONE;
    } else if (!previousLessonProgress || previousLessonProgress?.isCompleted) {
      lessonStatus = LessonStatus.AVAILABLE;
    } else {
      lessonStatus = LessonStatus.UNAVAILABLE;
    }
    previousLessonProgress = lessonProgress;

    return (
      <View>
        <Chevron
          beginLesson={() => startLesson(itemData.index)}
          lessonStatus={lessonStatus}
          lessonTitle={`leçon ${itemData.index + 1}`}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.hintBox}>
        <ButtonIcon
          onPress={showHint}
          iconName="help-circle"
          iconSize={30}
          btnSize={30}
          color={Colors.textColor}
          btnBackgroundColor={Colors.transparent}
          disabled={false}
        />
      </View>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        // keyExtractor={(item) => (Math.random() * 1000).toString()} // TODO: change unique key
        bounces={false}
        horizontal
        renderItem={renderLessonPreview}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    backgroundColor: Colors.cardBackgroundColor,
    borderRadius: 10,
    width: '96%',
    flexDirection: 'column',
    top: 65,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  hintBox: {
    position: 'absolute',
    left: 210,
    top: -70,
  },
});
