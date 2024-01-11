/* eslint-disable global-require */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Image, View, Text, Platform, StyleSheet } from 'react-native';
import { ButtonText } from '../../../components/basics/Buttons';
import LessonModal from '../../../components/courseLearning/lesson/LessonModal';
import Colors from '../../../constants/styles';
import * as Controller from '../../../controller/controller';
import { useUserContext } from '../../../contexts/UserContext';
import Question from '../../../models/course/question/Question';
import Lesson from '../../../models/course/lesson/Lesson';
import { useCoursesContext } from '../../../contexts/CoursesContext';
import LoadingOverlay from '../../../components/basics/LoadingOverlay';

const NUMBER_OF_QUESTIONS_PER_PRACTICE_SESSION = 3;

function PracticeScreen() {
  const userContext = useUserContext();
  const courseContext = useCoursesContext();

  const [failedQuestions, setFailedQuestions] = useState<Question[]>([]);
  const [hasLessonStarted, setHasLessonStarted] = useState<boolean>(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson>();
  const [loadingFailedQuestions, setLoadingFailedQuestions] = useState(false);

  useEffect(() => {
    if (userContext?.currentCourseProgress?.courseId === undefined) return;

    const failedQuestionBuilder: Question[] = [];
    const awaitFailedQuestions = async () => {
      try {
        const res = await Controller.getFailedQuestionsIds(
          courseContext.currentCourse.id,
        );
        const fetchedFailedQuestionsIds = res.data as string[];
        fetchedFailedQuestionsIds.forEach(id => {
          const question = courseContext.findQuestionInCurrentCourse(id);
          if (question) {
            failedQuestionBuilder.push(question);
          } else {
            Controller.notifyMissingFailedQuestion(id, courseContext.currentCourse.id);
          }
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error({ message });
        console.warn('failed to getFailedQuestionsIds..');
      } finally {
        setFailedQuestions(failedQuestionBuilder);
      }
    };
    setLoadingFailedQuestions(true);
    awaitFailedQuestions();
    setLoadingFailedQuestions(false);
  }, [hasLessonStarted, courseContext]);

  async function startLesson() {
    if (failedQuestions && failedQuestions.length > 0) {
      const numberOfQuestions = Math.min(NUMBER_OF_QUESTIONS_PER_PRACTICE_SESSION, failedQuestions.length);
      const questions = failedQuestions.slice(0, numberOfQuestions);
      setCurrentLesson({
        id: 'practice-lesson',
        name: 'practice-lesson',
        questions,
      });
      setHasLessonStarted(true);
    }
  }

  if (loadingFailedQuestions) {
    return <LoadingOverlay message="merci de patienter.." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.bannerImage}
          source={require('../../../../assets/images/forge.png')}
        />
        <Text style={styles.sectionTitle}>C&apos;est en forgeant {'\n'}qu&apos; on devient forgeron</Text>
      </View>

      <View style={styles.practiceButton}>
        {failedQuestions?.length > 0 && (
          <>
            <Text
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                fontSize: 16,
                fontWeight: '600',
                color: Colors.textColor,
              }}
            >
              {failedQuestions?.length} erreurs à revoir
            </Text>
            <ButtonText
              onPress={() => startLesson()}
              textContent="COMMENCER"
              btnHeight={100}
              btnWidth={300}
              btnImgBackgroundColor={Colors.tinyOpacity}
              padding={10}
              disabled={failedQuestions?.length === 0}
            />
          </>
        )}
        {failedQuestions?.length === 0 && (
          <ButtonText
            onPress={() => startLesson()}
            textContent="Aucune question à revoir"
            btnHeight={100}
            btnWidth={300}
            btnImgBackgroundColor={Colors.tinyOpacity}
            padding={10}
            disabled={failedQuestions?.length === 0}
          />
        )}
        {userContext?.currentCourseProgress?.courseId === undefined && (
          <Text style={styles.sectionTitle}>Aucun cours n'est suivi</Text>
        )}
      </View>
      {hasLessonStarted && currentLesson && (
        <LessonModal
          toggleVisibility={setHasLessonStarted}
          lesson={currentLesson}
        />
      )}
    </View>
  );
}

export default PracticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.coursesBackgroundColor,
  },
  header: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    position: 'absolute',
    width: 300,
    top: 175,
    fontSize: 20,
    color: 'rgba(0,0,0,0.7)',
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Papyrus',
    textAlign: 'center',
  },
  bannerImage: {
    width: 200,
    height: 170,
    padding: 0,
    margin: 0,
  },
  practiceButton: {
    margin: 30,
    width: '80%',
    height: 100,
    borderWidth: 4,
    borderColor: Colors.bottomBorderSeparator,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
