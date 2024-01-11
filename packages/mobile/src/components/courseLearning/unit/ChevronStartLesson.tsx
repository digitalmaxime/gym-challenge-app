/* eslint-disable max-len */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import Colors from '../../../constants/styles';
import LessonStatus from '../lesson/LessonEnum';

const availableChevronColors = [Colors.btnCheckBorderColor, Colors.textLessonColor, Colors.coursesBackgroundColor];
const availableTextColors = [Colors.bottomNavBarColor, Colors.textColor, Colors.coursesBackgroundColorAlt];

  type ChevronProp = {
    beginLesson: () => void;
    lessonTitle: string;
    lessonStatus: LessonStatus;
}

export default function Chevron({ beginLesson, lessonTitle, lessonStatus }: ChevronProp) {
  return (
    <TouchableOpacity style={styles.container} disabled={lessonStatus === LessonStatus.UNAVAILABLE} onPress={() => beginLesson()}>
      <Text style={[
        styles.lessonTitle,
        { color: availableTextColors[lessonStatus] },
        { fontStyle: lessonStatus === LessonStatus.DONE ? 'italic' : 'normal' },
      ]}
      >{lessonTitle}
      </Text>
      <View style={styles.chevron}>
        <View style={[styles.chevronMain, { backgroundColor: availableChevronColors[lessonStatus] }]} />
        <View style={[styles.chevronTriangle, styles.chevronTopLeft, { borderLeftColor: availableChevronColors[lessonStatus] }]} />
        <View style={[styles.chevronTriangle, styles.chevronTopRight, { borderLeftColor: availableChevronColors[lessonStatus] }]} />
        <View style={[styles.chevronTriangle, styles.chevronBottomLeft, { borderLeftColor: availableChevronColors[lessonStatus] }]} />
        <View style={[styles.chevronTriangle, styles.chevronBottomRight, { borderLeftColor: availableChevronColors[lessonStatus] }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: 44,
  },
  lessonTitle: {
    position: 'absolute',
    fontSize: 12,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'AvenirNext-DemiBold',
    zIndex: 1,
  },
  chevron: {
    width: 60,
    height: 16,
  },
  chevronMain: {
    width: 60,
    height: 16,
  },
  chevronTriangle: {
    borderTopWidth: 7,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 30,
    borderTopColor: 'transparent',
  },
  chevronTopLeft: {
    position: 'absolute',
    top: -7,
    left: 0,
    borderTopRightRadius: 50,
    borderTopStartRadius: 70,
  },
  chevronTopRight: {
    position: 'absolute',
    top: -7,
    right: 0,
    transform: [{ scaleX: -1 }],
    borderTopRightRadius: 55,
    borderTopStartRadius: 90,
  },
  chevronBottomLeft: {
    position: 'absolute',
    bottom: -7,
    left: 0,
    transform: [{ scale: -1 }],

    // borderBottomRadius: 55,
  },
  chevronBottomRight: {
    position: 'absolute',
    bottom: -7,
    right: 0,
    transform: [{ scaleY: -1 }],
  },
});
