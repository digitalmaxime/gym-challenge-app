import React, { ChangeEvent, RefObject } from 'react';
import {
  VStack, Input, InputGroup, InputLeftAddon, Button, Text, Accordion,
  AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Lesson from '../../utils/Lesson';
import Question from '../../utils/Question';
import { QuestionClass } from '../CourseModificationComponents/QuestionClass';

export interface LessonClassProp {
    lesson: Lesson,
    index: number,
    isLast: boolean,
    addLesson : () => void,
    removeLesson : (index: number) => void,
    updateLesson : (index: number, s: Lesson) => void,
  }

interface LessonClassState {
  currentLesson : Lesson,
  currentIndex: number,
  questionsRefs : RefObject<QuestionClass>[],
  questionsOpen: boolean[],
}

export class LessonClass extends React.Component<LessonClassProp, LessonClassState> {
  thisRemoveLesson: (index: number) => void;

  thisUpdateLesson: (index: number, s: Lesson) => void;

  constructor(props: LessonClassProp) {
    super(props);
    const questionsRefs = props.lesson.questions.map(() => React.createRef<QuestionClass>());
    const questionsOpen = props.lesson.questions.map(() => false);
    this.state = {
      currentLesson: props.lesson,
      currentIndex: props.index,
      questionsRefs,
      questionsOpen,
    };
    this.thisUpdateLesson = props.updateLesson;
    this.thisRemoveLesson = props.removeLesson;
  }

  static getDerivedStateFromProps(props:LessonClassProp) {
    const questionsRefs = props.lesson.questions.map(() => React.createRef<QuestionClass>());
    return {
      currentLesson: props.lesson,
      currentIndex: props.index,
      questionsRefs,
    };
  }

  handleDeleteLesson = () => {
    const { currentIndex } = this.state;
    this.thisRemoveLesson(currentIndex);
  };

  handleChangeLessonName = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentLesson, currentIndex } = this.state;
    currentLesson.name = e.target.value;
    this.thisUpdateLesson(currentIndex, currentLesson);
  };

  handleToggleQuestion = (indx: number) => {
    const { questionsOpen } = this.state;
    questionsOpen[indx] = !questionsOpen[indx];
    this.setState({ questionsOpen });
  };

  updateQuestion(index: number, q:Question) {
    const { currentLesson, currentIndex } = this.state;
    currentLesson.questions[index] = q;
    this.thisUpdateLesson(currentIndex, currentLesson);
  }

  removeQuestion(index: number) {
    const { currentLesson, currentIndex, questionsOpen } = this.state;
    currentLesson.questions.splice(index, 1);
    questionsOpen.splice(index, 1);
    this.setState({ questionsOpen }, () => { this.thisUpdateLesson(currentIndex, currentLesson); });
  }

  addQuestion(questionType: number) {
    const { currentLesson, currentIndex, questionsOpen } = this.state;
    const questionId = `${currentLesson.id}$${uuidv4()}`;
    let customQuestionText = '';
    if (questionType in [1, 2]) {
      customQuestionText = 'Énoncé de la question autogen';
    } else {
      customQuestionText = 'Énoncé de la question autogen ($_$)';
    }
    const q: Question = {
      correctAnswers: ['Bonne réponse autogen'],
      otherAnswers: ['Mauvaise réponse autogen'],
      id: questionId,
      name: 'Nom de la question autogen',
      questionText: customQuestionText,
      type: questionType,
      imageUri: '',
    };
    currentLesson.questions.push(q);
    questionsOpen.push(true);
    this.setState({ questionsOpen }, () => { this.thisUpdateLesson(currentIndex, currentLesson); });
    this.thisUpdateLesson(currentIndex, currentLesson);
  }

  render() {
    const {
      currentLesson, questionsRefs, currentIndex, questionsOpen,
    } = this.state;
    const {
      isLast, addLesson,
    } = this.props;
    return (
      <VStack w="100%" align="left">
        <Accordion allowToggle bg="blue.300">
          <AccordionItem>
            <AccordionButton>
              <Text flex="1" textAlign="left">
                {currentLesson.name}
              </Text>
              {currentIndex === 0 && isLast
                ? (null)
                : <DeleteIcon onClick={this.handleDeleteLesson} />}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <InputGroup size="sm" p="1" w="70%">
                <InputLeftAddon color="gray.800">Nom de la leçon</InputLeftAddon>
                <Input textAlign="left" onChange={this.handleChangeLessonName} value={currentLesson.name} />
              </InputGroup>
              <VStack align="left" pl="1%">
                {currentLesson.questions.map((question, qind) => (
                  <QuestionClass
                    ref={questionsRefs[qind]}
                    question={question}
                    index={qind}
                    isLast={(currentLesson.questions.length - 1 === qind)}
                    updateQuestion={(i, q) => this.updateQuestion(i, q)}
                    removeQuestion={() => this.removeQuestion(qind)}
                    addQuestion={(n: number) => this.addQuestion(n)}
                    defaultOpen={questionsOpen[qind]}
                    toggleOpenQuestion={(ind:number) => { this.handleToggleQuestion(ind); }}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`Question_${question.id}${qind}`}
                  />
                ))}
              </VStack>

            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {isLast
          ? (
            <Button size="sm" onClick={addLesson}>
              <AddIcon m="1" />
              <Text fontSize="md">
                Ajouter une leçon
              </Text>
            </Button>
          )
          : null}

      </VStack>

    );
  }
}
