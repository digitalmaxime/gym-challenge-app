import React, { ChangeEvent, RefObject } from 'react';
import {
  VStack, Input, InputLeftAddon, InputGroup, Button, Accordion,
  AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Text,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Lesson from '../../utils/Lesson';
import Unit from '../../utils/Unit';
import { LessonClass } from '../CourseModificationComponents/LessonClass';

export interface UnitClassProp {
    unit: Unit,
    index: number,
    isLast: boolean,
    addUnit : () => void,
    removeUnit : (index: number) => void,
    updateUnit : (index: number, s: Unit) => void,
  }

  interface UnitClassState {
    currentUnit : Unit,
    childLessonRefs : RefObject<LessonClass>[],
    currentIndex : number,
  }

export class UnitClass extends React.Component<UnitClassProp, UnitClassState> {
  thisRemoveUnit: (index: number) => void;

  thisUpdateUnit: (index: number, s: Unit) => void;

  constructor(props: UnitClassProp) {
    super(props);
    const childLessonRefs = props.unit.lessons.map(() => React.createRef<LessonClass>());
    this.state = {
      currentUnit: props.unit,
      childLessonRefs,
      currentIndex: props.index,
    };
    this.thisUpdateUnit = props.updateUnit;
    this.thisRemoveUnit = props.removeUnit;
  }

  static getDerivedStateFromProps(props:UnitClassProp) {
    const childLessonRefs = props.unit.lessons.map(() => React.createRef<LessonClass>());
    return {
      currentUnit: props.unit,
      childLessonRefs,
      currentIndex: props.index,
    };
  }

  handleDeleteUnit = () => {
    const { currentIndex } = this.state;
    this.thisRemoveUnit(currentIndex);
  };

  handleChangeUnitName = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentUnit, currentIndex } = this.state;
    currentUnit.name = e.target.value;
    this.thisUpdateUnit(currentIndex, currentUnit);
  };

  handleChangeUnitHintUri = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentUnit, currentIndex } = this.state;
    currentUnit.hintUri = e.target.value;
    this.thisUpdateUnit(currentIndex, currentUnit);
  };

  addLesson() {
    const { currentUnit, currentIndex } = this.state;
    const lessonId = `${currentUnit.id}$${uuidv4()}`;
    const questionId = `${lessonId}$${uuidv4()}`;
    const l: Lesson = {
      id: lessonId,
      name: 'Entrez le nom dune nouvelle Leçon',
      questions: [{
        correctAnswers: ['Bonne réponse autogen'],
        otherAnswers: ['Mauvaise réponse autogen'],
        id: questionId,
        name: 'Nom de la question autogen',
        questionText: 'Énoncé de la question autogen',
        type: 0,
        imageUri: '',
      }],
    };
    currentUnit.lessons.push(l);
    this.thisUpdateUnit(currentIndex, currentUnit);
  }

  removeLesson(index: number) {
    const { currentUnit, currentIndex } = this.state;
    currentUnit.lessons.splice(index, 1);
    this.thisUpdateUnit(currentIndex, currentUnit);
  }

  updateLesson(index: number, l:Lesson) {
    const { currentUnit, currentIndex } = this.state;
    currentUnit.lessons[index] = l;
    this.thisUpdateUnit(currentIndex, currentUnit);
  }

  render() {
    const { currentUnit, childLessonRefs, currentIndex } = this.state;

    if (currentUnit.lessons.length < 1) { return null; }

    const {
      isLast, addUnit,
    } = this.props;

    return (
      <VStack w="100%" align="left">

        <Accordion allowToggle bg="blue.200">
          <AccordionItem>
            <AccordionButton>
              <Text flex="1" textAlign="left">
                {currentUnit.name}
              </Text>
              {currentIndex === 0 && isLast
                ? (null)
                : <DeleteIcon onClick={this.handleDeleteUnit} />}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <InputGroup size="sm" p="1" w="70%">
                <InputLeftAddon color="gray.800">Nom de l&apos;unité</InputLeftAddon>
                <Input textAlign="left" onChange={this.handleChangeUnitName} placeholder={currentUnit.name} />
              </InputGroup>
              <InputGroup size="sm" p="1" w="70%">
                <InputLeftAddon color="gray.800">Texte Astuce</InputLeftAddon>
                <Input textAlign="left" onChange={this.handleChangeUnitHintUri} placeholder={currentUnit.hintUri} />
              </InputGroup>

              <VStack align="left" pl="1%">
                {currentUnit.lessons.map((lesson, i) => (
                  <LessonClass
                    ref={childLessonRefs[i]}
                    lesson={lesson}
                    index={i}
                    isLast={(currentUnit.lessons.length - 1 === i)}
                    updateLesson={(ind, l) => this.updateLesson(ind, l)}
                    removeLesson={() => this.removeLesson(i)}
                    addLesson={() => this.addLesson()}
                    key={`Lesson_${i.toString()}`}
                  />
                ))}
              </VStack>

            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {isLast
          ? (
            <Button size="sm" onClick={addUnit}>
              <AddIcon m="1" />
              <Text fontSize="md">
                Ajouter une unité
              </Text>
            </Button>
          )
          : null}
      </VStack>
    );
  }
}
