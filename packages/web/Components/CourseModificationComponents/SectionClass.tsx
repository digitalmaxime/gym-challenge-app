import React, { ChangeEvent, RefObject } from 'react';
import {
  VStack, Input, InputGroup, InputLeftAddon, Button, Accordion, AccordionItem,
  AccordionButton, AccordionIcon, AccordionPanel, Box, Text,
} from '@chakra-ui/react';
import {
  AddIcon, DeleteIcon,
} from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import Section from '../../utils/Section';
import Unit from '../../utils/Unit';
import { UnitClass } from '../CourseModificationComponents/UnitClass';
import { SectionsContent } from '../CourseModificationComponent';

export interface SectionClassProp {
  section:Section,
  index: number,
  isLast: boolean,
  addSection : () => void,
  removeSection : (index: number) => void,
  updateSection : (index: number, newValid: boolean, s: Section) => void,
  sectionsContent: SectionsContent,
}

interface SectionClassState {
  currentSection: Section,
  sectionsContent: SectionsContent,
  isValid : boolean,
  currentIndex : number,
  childUnitsRefs : RefObject<UnitClass>[],
}

export class SectionClass extends React.Component<SectionClassProp, SectionClassState> {
  thisRemoveSection: (index: number) => void;

  thisUpdateSection: (index: number, newValid: boolean, s: Section) => void;

  constructor(props: SectionClassProp) {
    super(props);
    const childUnitsRefs = props.section.units.map(() => React.createRef<UnitClass>());

    this.state = {
      currentSection: props.section,
      sectionsContent: props.sectionsContent,
      isValid: true,
      currentIndex: props.index,
      childUnitsRefs,
    };

    this.thisUpdateSection = props.updateSection;
    this.thisRemoveSection = props.removeSection;
  }

  static getDerivedStateFromProps(props:SectionClassProp) {
    const childUnitsRefs = props.section.units.map(() => React.createRef<UnitClass>());

    return {
      currentSection: props.section,
      sectionsContent: props.sectionsContent,
      isValid: true,
      currentIndex: props.index,
      childUnitsRefs,
    };
  }

  handleDeleteSection = () => {
    const { currentIndex } = this.state;
    this.thisRemoveSection(currentIndex);
  };

  handleChangeSectionName = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentSection, currentIndex, isValid } = this.state;
    currentSection.name = e.target.value;
    this.thisUpdateSection(currentIndex, isValid, currentSection);
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  getState() {
    const { currentSection } = this.state;
    return currentSection;
  }

  updateUnit(index: number, u:Unit) {
    const { currentSection, currentIndex } = this.state;
    currentSection.units[index] = u;
    this.thisUpdateSection(currentIndex, true, currentSection);
  }

  removeUnit(index: number) {
    const { currentSection, currentIndex } = this.state;
    currentSection.units.splice(index, 1);
    this.thisUpdateSection(currentIndex, true, currentSection);
  }

  addUnit() {
    const { currentSection, currentIndex } = this.state;
    const parentSectionId = currentSection.id;
    const unitUuid = `${parentSectionId}$${uuidv4()}`;
    const lessonUuid = `${unitUuid}$${uuidv4()}`;
    const questionUuid = `${lessonUuid}$${uuidv4()}`;

    const u: Unit = {
      description: 'Description vide',
      id: unitUuid,
      lessons: [{
        id: lessonUuid,
        name: 'Leçon autogénerée',
        questions: [{
          correctAnswers: ['Bonne réponse autogen'],
          otherAnswers: ['Mauvaise réponse autogen'],
          id: questionUuid,
          name: 'Nom de la question autogen',
          questionText: 'Énoncé de la question autogen',
          type: 0,
          imageUri: '',
        }],
      }],
      name: 'unité autogen',
      hintUri: '',
    };

    currentSection.units.push(u);
    this.thisUpdateSection(currentIndex, true, currentSection);
  }

  render() {
    const {
      currentSection, isValid, sectionsContent, currentIndex, childUnitsRefs,
    } = this.state;
    let sectionBorderColor = 'black';
    if (isValid) {
      if (sectionsContent.publishedSections
        && sectionsContent.publishedSections.length < currentIndex
        && sectionsContent.publishedSections[currentIndex] === currentSection) {
        sectionBorderColor = 'black';
      } else if (sectionsContent.savedSections.length < currentIndex
        && sectionsContent.savedSections[currentIndex] === currentSection) {
        sectionBorderColor = 'green';
      } else {
        sectionBorderColor = 'orange';
      }
    } else {
      sectionBorderColor = 'red';
    }

    if (currentSection.units.length < 1) { return null; }
    const { isLast, addSection } = this.props;
    return (
      <VStack w="100%" align="left" borderColor={sectionBorderColor}>

        <Accordion allowToggle bg="blue.100">

          <AccordionItem>
            <AccordionButton>
              <Text flex="1" textAlign="left">{currentSection.name}</Text>
              {currentIndex === 0 && isLast
                ? (null)
                : (<Box><DeleteIcon onClick={this.handleDeleteSection} /></Box>)}
              <AccordionIcon>
                <Button size="sm" />
              </AccordionIcon>
            </AccordionButton>
            <AccordionPanel>
              <InputGroup size="sm" p="1" w="70%">
                <InputLeftAddon color="gray.800">Nom de la section</InputLeftAddon>
                <Input textAlign="left" onChange={this.handleChangeSectionName} value={currentSection.name} />
              </InputGroup>

              <VStack align="left" pl="1%">
                {currentSection.units.map((unit, sIndex) => (
                  <UnitClass
                    ref={childUnitsRefs[sIndex]}
                    unit={unit}
                    index={sIndex}
                    isLast={(currentSection.units.length - 1 === sIndex)}
                    updateUnit={(ind, u) => this.updateUnit(ind, u)}
                    removeUnit={() => this.removeUnit(sIndex)}
                    addUnit={() => this.addUnit()}
                    key={`Unit_${sIndex.toString()}`}
                  />
                ))}
              </VStack>

            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        {isLast
          ? (
            <Button size="sm" onClick={addSection}>
              <AddIcon m="1" />
              <Text fontSize="md">
                Ajouter une section
              </Text>
            </Button>
          )
          : null}
      </VStack>

    );
  }
}
