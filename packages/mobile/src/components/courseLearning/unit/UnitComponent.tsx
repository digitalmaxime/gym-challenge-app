/* eslint-disable max-len */
import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from '../../../constants/styles';
import { useUserContext } from '../../../contexts/UserContext';
import Lesson from '../../../models/course/lesson/Lesson';
import Unit from '../../../models/course/unit/Unit';
import { ButtonImg } from '../../basics/Buttons';
import LessonModal from '../lesson/LessonModal';
import BeginUnitMenu from './BeginUnitMenu';
import * as Controller from '../../../controller/controller';
import { useCoursesContext } from '../../../contexts/CoursesContext';
import Question from '../../../models/course/question/Question';
import LoadingOverlay from '../../basics/LoadingOverlay';
import { getNbOfCompletedLessons, shuffleList } from '../../../utils/lessonModalHelpers';

interface UnitProps {
  unit: Unit;
}

/** Here we click on the unit to start the lesson flow */
function UnitComponent({ unit }: UnitProps) {
  const courseContext = useCoursesContext();
  const userContext = useUserContext();
  const progress = userContext.currentCourseProgress?.progress;
  const nbOfCompletedLessons = getNbOfCompletedLessons(unit.id, progress);
  const nbOfLessons = unit.lessons?.length > 0 ? unit.lessons.length : 1;

  const [hasLessonStarted, setHasLessonStarted] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson>();
  const [isLoadingLesson, setIsLoadingLesson] = useState<boolean>(false);

  async function startLesson(index: number) {
    setIsLoadingLesson(true);
    const lesson = unit.lessons[index];
    let olderQuestionsIdToInclude;

    try {
      const res = await Controller.getQuestionsFromPriorityQueue(courseContext.currentCourse.id);
      olderQuestionsIdToInclude = res?.data;
    } catch (error) {
      const message = (error instanceof Error) ? error.message : String(error);
      console.error({ message });
      console.warn('failed to getQuestionsFromPriorityQueue..');
    } finally {
      const olderQuestionsToInclude: Question[] = [];
      if (olderQuestionsIdToInclude && Array.isArray(olderQuestionsIdToInclude)) {
        olderQuestionsIdToInclude = olderQuestionsIdToInclude.filter(idToAdd => { // TODO: mettre ds utils ou qqchose
          const alreadyInList = lesson.questions.findIndex(q => q.id === idToAdd);
          return alreadyInList < 0;
        });
        olderQuestionsIdToInclude.forEach((qId: string) => {
          const failedQuestion = courseContext.findQuestionInCurrentCourse(qId);
          if (failedQuestion) {
            olderQuestionsToInclude.push(failedQuestion);
          } else {
            Controller.notifyMissingPriorityQuestion(qId, courseContext.currentCourse.id);
          }
        });
      }

      olderQuestionsToInclude.forEach(q => lesson.questions.push(q));
      lesson.questions = shuffleList(lesson.questions);

      setCurrentLesson(lesson);
      setTimeout(() => {
        setHasLessonStarted(true);
        setIsLoadingLesson(false);
      }, 1000);
    }
  }

  if (isLoadingLesson) {
    return <LoadingOverlay message="Chargement en cours.." />;
  }

  return (
    <View>
      {hasLessonStarted && (
      <LessonModal
        toggleVisibility={setHasLessonStarted}
        lesson={currentLesson}
      />
      )}

      <View style={styles.unitContainer}>
        <View style={styles.unitGraphicsContainer}>

          <View style={styles.unitProgressBar}>
            <Progress.Circle
              size={58}
              progress={nbOfCompletedLessons / nbOfLessons}
              borderWidth={1}
              color={Colors.sectionIconColor}
              indeterminate={false}
            />
          </View>

          <View style={styles.unitImage}>
            <ButtonImg
              onPress={() => setShowMenu(!showMenu)}
              size={48}
              imageUri="https://firebasestorage.googleapis.com/v0/b/gapris-6b7d5.appspot.com/o/lustered-marble.jpg?alt=media&token=6bb65822-3bc0-4682-add1-08216fb7f547"
            />
          </View>
        </View>

      </View>

      <Text style={styles.unitName}>{unit.name}</Text>

      {showMenu && (
      <BeginUnitMenu
        startLesson={startLesson}
        hintText={unit.hintUri}
        lessons={unit.lessons}
      />
      )}
    </View>
  );
}

export default UnitComponent;

const styles = StyleSheet.create({
  container: {},
  unitContainer: { justifyContent: 'center', alignItems: 'center' },
  unitGraphicsContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitNumber: {
    color: Colors.textColor,
    fontSize: 35,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Noteworthy-Bold',
    position: 'absolute',
    alignSelf: 'center',
  },
  unitProgressBar: { position: 'absolute' },
  unitImage: { position: 'absolute' },
  unitName: {
    color: Colors.sectionTitleBackgroundColor,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'AvenirNext-DemiBold',
  },
});
