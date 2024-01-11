/* eslint-disable max-len */
import React, {
  Dispatch,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View, Modal, SafeAreaView, StatusBar } from 'react-native';
import * as Progress from 'react-native-progress';

import { ButtonIcon } from '../../basics/Buttons';
import Colors from '../../../constants/styles';
import FinishedLessonModal from './FinishedLessonModal';
import CheckBtnComponent from '../question/CheckBtnComponent';
import * as Controller from '../../../controller/controller';
import { useUserContext } from '../../../contexts/UserContext';
import Lesson from '../../../models/course/lesson/Lesson';
import Question from '../../../models/course/question/Question';
import QuestionEnum from '../../../models/course/question/QuestionEnum';

import MultipleChoices from '../question/MultipleChoicesComponent';
import FillInBrokenSentence from '../question/FillInBrokenSentenceComponent';
import TypeInBrokenSentence from '../question/TypeInBrokenSentenceComponent';
import ObserveAndIdentify from '../question/ObserveAndIdentifyComponent';
import CourseProgress from '../../../models/progress/CourseProgress';
import {
  PossibleAnswer,
  PressedAnswer,
  HoleAnswer,
  BrokenSentence,
} from '../../../models/course/lesson/LessonTypes';
import createPossibleAnswersArray, { checkBrokenSentenceAnswer, checkMultipleChoiceAnswer, parseBrokenQuestion, parseBrokenQuestionBlocks, parseBrokenQuestionHoleAnswers } from '../../../utils/lessonModalHelpers';

interface LessonModalProps {
  toggleVisibility: Dispatch<React.SetStateAction<boolean>>;
  lesson: Lesson;
}

function LessonModal({ toggleVisibility, lesson }: LessonModalProps) {
  const userContext = useUserContext();
  const [currentLesson, setCurrentLesson] = useState<Lesson>({
    ...lesson,
    questions: lesson ? [...lesson.questions] : [],
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    lesson?.questions[0],
  );

  const [pressedAnswers, setPressedAnswers] = useState<PressedAnswer[]>([]);
  const [possibleAnswers, setPossibleAnswers] = useState<PossibleAnswer[]>(() =>
    createPossibleAnswersArray(lesson?.questions[0]),
  );

  // necessary for CHECK current lesson button
  const [isCurrentQuestionCompleted, setIsCurrentQuestionCompleted] =
    useState(false);
  const [isCurrentLessonCompleted, setIsCurrentLessonCompleted] =
    useState(false);
  const [isCurrentQuestionSuccess, setIsCurrentQuestionSuccess] =
    useState(false);
  const [lessonProgressPercentage, setLessonProgressPercentage] = useState(0);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);

  // top progress bar data
  const nbOfCorrectlyAnsweredQuestions = useRef(0);
  const initialNbOfQuestionsInLesson: MutableRefObject<number> = useRef(
    lesson?.questions?.length || 0,
  );

  // broken sentences holes
  const [holeAnswers, setHoleAnswers] = useState<HoleAnswer[]>(() =>
    parseBrokenQuestionHoleAnswers(lesson?.questions[0]),
  );
  const [blocksOfWords, setBlocks] = useState<(BrokenSentence | HoleAnswer)[]>(
    () => parseBrokenQuestionBlocks(lesson?.questions[0]),
  );

  // broken sentences holes with typing
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  useEffect(() => {
    if (pressedAnswers.length > 0) {
      setHasAnswered(true);
    } else {
      setHasAnswered(false);
    }
  }, [pressedAnswers]);

  function handleAnswerPress(selectedAnswer: PressedAnswer): void {
    for (let i = 0; i < pressedAnswers.length; i += 1) {
      if (pressedAnswers[i].pressedAnswer === selectedAnswer.pressedAnswer) {
        setPressedAnswers(prevPressedAnswers =>
          prevPressedAnswers.filter(
            ans => ans.pressedAnswer !== selectedAnswer.pressedAnswer,
          ),
        );
        return;
      }
    }
    setPressedAnswers(prevPressedAnswers => [
      ...prevPressedAnswers,
      selectedAnswer,
    ]);
  }

  async function endLesson() {
    setIsCurrentLessonCompleted(true);

    if (
      currentLesson.name === 'practice-lesson' &&
      currentLesson.id === 'practice-lesson'
    ) {
      return;
    }

    Controller.updateLessonProgress(
      userContext?.userData?.id,
      userContext.currentCourseProgress?.courseId || '',
      true,
      lesson.id,
    )
      .then(res => {
        const updatedProgress: CourseProgress = res.data as CourseProgress;
        if (
          'progress' in updatedProgress &&
          'userScore' in updatedProgress &&
          'courseId' in updatedProgress
        ) {
          userContext.setCurrentCourseProgress(updatedProgress);
        }
      })
      .catch(error => {
        const message = error instanceof Error ? error.message : String(error);
        console.error({ message });
        console.warn('failed at updateLessonProgress() :(');
      });
  }

  function handleCheckPress(): boolean {
    /** Prevent users from selecting other answers during animation */
    setIsAnswerLocked(true);

    let isQuestionAnsweredCorrectly = true;
    if (
      currentQuestion.type === QuestionEnum.OBSERVE_AND_IDENTIFY ||
      currentQuestion.type === QuestionEnum.MULTIPLE_CHOICES
    ) {
      isQuestionAnsweredCorrectly = checkMultipleChoiceAnswer(pressedAnswers, currentQuestion);
    }
    if (
      currentQuestion.type === QuestionEnum.FILL_IN_BROKEN_SENTENCES ||
      currentQuestion.type === QuestionEnum.TYPE_IN_BROKEN_SENTENCES
    ) {
      isQuestionAnsweredCorrectly = checkBrokenSentenceAnswer(holeAnswers);
    }

    if (isQuestionAnsweredCorrectly) {
      // Timeout set to delay 'isCurrentQuestionCompleted' state, this allows animation
      setTimeout(() => {
        setIsCurrentQuestionCompleted(true);

        /** Remove successfully completed question from lesson */
        setCurrentLesson((prevLesson: Lesson) => {
          prevLesson.questions.shift();
          const updatedLesson = { ...prevLesson };
          return updatedLesson;
        });

        nbOfCorrectlyAnsweredQuestions.current += 1;
        setLessonProgressPercentage(
          nbOfCorrectlyAnsweredQuestions.current /
            initialNbOfQuestionsInLesson.current,
        );
      }, 350);

      setIsCurrentQuestionSuccess(true);
      if (currentLesson.name === 'practice-lesson') {
        Controller.removeQuestionFromFailedQuestions(
          userContext.currentCourseProgress?.courseId,
          currentQuestion.id,
        );
      }
    } else {
      /** Answer was incorrect  */
      setCurrentLesson((prevLesson: Lesson) => {
        /** push failed question back into the lesson for further questioning */
        prevLesson.questions.shift();
        prevLesson.questions.push(currentQuestion);
        const updatedLesson = { ...prevLesson };
        return updatedLesson;
      });
      setIsCurrentQuestionCompleted(true);
      setIsCurrentQuestionSuccess(false);
    }

    Controller.postCompleteQuestion(
      userContext.currentCourseProgress?.courseId,
      currentQuestion.id,
      !isQuestionAnsweredCorrectly,
    );

    return isQuestionAnsweredCorrectly;
  }

  function goToNextQuestion(): boolean {
    setPressedAnswers([]);
    setIsAnswerLocked(false);
    setIsCurrentQuestionSuccess(false);
    setIsCurrentQuestionCompleted(false);
    setHasAnswered(false);
    setPossibleAnswers(createPossibleAnswersArray(currentLesson.questions[0]));
    setCurrentQuestion(currentLesson.questions[0]);

    setHoleAnswers([]);
    parseBrokenQuestion(currentLesson.questions[0], setBlocks, setHoleAnswers);

    return true;
  }

  function renderQuestionAndAnswers(): JSX.Element {
    if (currentQuestion.type === QuestionEnum.MULTIPLE_CHOICES) {
      const question = currentQuestion as Question;

      return (
        <MultipleChoices
          question={question}
          isAnswerLocked={isAnswerLocked}
          possibleAnswers={possibleAnswers}
          handleAnswerPress={handleAnswerPress}
          pressedAnswers={pressedAnswers}
        />
      );
    }
    if (currentQuestion.type === QuestionEnum.OBSERVE_AND_IDENTIFY) {
      const question = currentQuestion as Question;
      return (
        <ObserveAndIdentify
          question={question}
          // isAnswerLocked={isAnswerLocked}
          observeImageUri={question.imageUri}
          possibleAnswers={possibleAnswers}
          pressedAnswers={pressedAnswers}
          setPressedAnswers={setPressedAnswers}
          setPossibleAnswers={setPossibleAnswers}
        />
      );
    }
    if (currentQuestion.type === QuestionEnum.FILL_IN_BROKEN_SENTENCES) {
      return (
        <FillInBrokenSentence
          blocksOfWords={blocksOfWords}
          holeAnswers={holeAnswers}
          possibleAnswers={possibleAnswers}
          setPossibleAnswers={setPossibleAnswers}
          handleAnswerPress={handleAnswerPress}
          setParentHoleAnswers={setHoleAnswers}
        />
      );
    }
    if (currentQuestion.type === QuestionEnum.TYPE_IN_BROKEN_SENTENCES) {
      return (
        <TypeInBrokenSentence
          blocksOfWords={blocksOfWords}
          holeAnswers={holeAnswers}
          setParentHoleAnswers={setHoleAnswers}
          setHasAnswered={setHasAnswered}
        />
      );
    }
    return <View />;
  }

  return (
    <Modal visible animationType="fade" presentationStyle="fullScreen">
      <SafeAreaView />
      <StatusBar barStyle="default" />
      <View style={styles.mainContainer}>
        {/* Top horizontal bar of information */}
        <View style={styles.closeAndProgression}>
          <ButtonIcon
            iconName="close"
            onPress={() => toggleVisibility(false)}
            iconSize={30}
            btnSize={32}
            color={Colors.cancel2}
            btnBackgroundColor={Colors.btnUnitBackgroundColor}
            disabled={false}
          />
          <View>
            <Progress.Bar
              width={250}
              progress={lessonProgressPercentage}
              borderWidth={1}
              color={Colors.polyBlue}
              indeterminate={false}
            />
          </View>
        </View>

        {/* Mid section to show the question and the multiple ways to show answers */}
        {renderQuestionAndAnswers()}

        {/* Universally used check button for all types of questions */}
        <View style={styles.checkBtnContainer}>
          <CheckBtnComponent
            isCurrentQuestionCompleted={isCurrentQuestionCompleted}
            isCurrentQuestionSuccess={isCurrentQuestionSuccess}
            currentLesson={currentLesson}
            handleCheckPress={handleCheckPress}
            endLesson={endLesson}
            goToNextQuestion={goToNextQuestion}
            hasAnswered={hasAnswered}
          />
        </View>
      </View>

      {/* Only shown when every questions are finished within this current lesson */}
      <FinishedLessonModal
        isVisible={isCurrentLessonCompleted}
        toggleFinishModalVisibility={setIsCurrentLessonCompleted}
        toggleLessonModal={toggleVisibility}
      />
    </Modal>
  );
}

export default LessonModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.lessonBackgroundColor,
  },
  closeAndProgression: {
    marginTop: 5,
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 10,
    width: 'auto',
    alignItems: 'center',
  },
  possibleAnswersContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBtnContainer: {
    marginBottom: 15,
    marginTop: 5,
    width: '100%',
    backgroundColor: Colors.lessonBackgroundColorAlt,
  },
  question: {
    fontSize: 20,
    margin: 15,
    color: Colors.textLessonColor,
  },
});
