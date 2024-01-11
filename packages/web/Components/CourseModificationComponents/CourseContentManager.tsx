import React, { RefObject } from 'react';
import {
  VStack, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import Section from '../../utils/Section';
import { SectionClass } from './SectionClass';
import { SectionsContent } from '../CourseModificationComponent';

interface SectionManagerProps {
  sectionsContent: SectionsContent,
  allFieldValidTrigger: (allvalid: boolean) => void;
}
interface SectionManagerState {
  currentSections: Section[]
  currentSectionsValid: boolean[]
  sectionsContent: SectionsContent,
  childSectionRefs : RefObject<SectionClass>[];
}

export default class CourseContentManager extends React.Component<
SectionManagerProps, SectionManagerState> {
  allFieldValidTrigger: (allvalid: boolean) => void;

  constructor(props: SectionManagerProps) {
    super(props);

    this.allFieldValidTrigger = props.allFieldValidTrigger;
    const currentSectionsValidD: boolean[] = [];
    const childSectionRefs: RefObject<SectionClass>[] = [];
    props.sectionsContent.savedSections.forEach(() => {
      childSectionRefs.push(React.createRef<SectionClass>());
      currentSectionsValidD.push(true);
    });

    this.state = {
      currentSections: props.sectionsContent.savedSections,
      sectionsContent: props.sectionsContent,
      currentSectionsValid: currentSectionsValidD,
      childSectionRefs,
    };
  }

  static getDerivedStateFromProps(props:SectionManagerProps) {
    const currentSectionsValidD: boolean[] = [];
    const childSectionRefs: RefObject<SectionClass>[] = [];
    props.sectionsContent.savedSections.forEach(() => {
      childSectionRefs.push(React.createRef<SectionClass>());
      currentSectionsValidD.push(true);
    });

    return {
      currentSections: props.sectionsContent.savedSections,
      sectionsContent: props.sectionsContent,
      currentSectionsValid: currentSectionsValidD,
      childSectionRefs,
    };
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  getState() {
    const { childSectionRefs } = this.state;
    const currentElement: SectionsContent = {
      publishedSections: [],
      savedSections: [],
    };

    childSectionRefs.forEach((reference) => {
      const sectionData: Section | undefined = reference.current?.getState();
      if (sectionData !== undefined) {
        currentElement.publishedSections.push(sectionData);
        currentElement.savedSections.push(sectionData);
      }
    });
    return currentElement;
  }

  addSection() {
    const newSectionId = uuidv4();
    const unitUuid = `${newSectionId}$${uuidv4()}`;
    const lessonUuid = `${unitUuid}$${uuidv4()}`;
    const questionUuid = `${lessonUuid}$${uuidv4()}`;

    const s: Section = {
      id: newSectionId,
      name: 'Section autogen',
      units: [{
        id: unitUuid,
        name: 'Unité autogen',
        description: 'Description de unité autogen',
        hintUri: 'Astuce autogen',
        lessons: [{
          id: lessonUuid,
          name: 'Leçon autogen',
          questions: [{
            id: questionUuid,
            name: 'Nom de la question autogen',
            questionText: 'Énoncé de la question autogen',
            correctAnswers: ['Bonne réponse autogen'],
            otherAnswers: ['Mauvaise réponse autogen'],
            imageUri: '',
            type: 0,
          }],
        }],
      }],
      controlPoint: null,
    };
    const { currentSections, currentSectionsValid, childSectionRefs } = this.state;
    currentSections.push(s);
    currentSectionsValid.push(true);
    childSectionRefs.push(React.createRef<SectionClass>());
    this.setState({ currentSections, currentSectionsValid, childSectionRefs });
  }

  removeSection(index: number) {
    const { currentSections, currentSectionsValid, childSectionRefs } = this.state;
    currentSections.splice(index, 1);
    childSectionRefs.splice(index, 1);
    currentSectionsValid.splice(index, 1);
    this.setState({ currentSections, currentSectionsValid, childSectionRefs });
  }

  updateSectionValid(index:number, newValid: boolean, section:Section) {
    const { currentSectionsValid, currentSections } = this.state;
    currentSectionsValid[index] = newValid;
    currentSections[index] = section;
    this.setState({ currentSectionsValid, currentSections });
    this.allFieldValidTrigger(!currentSectionsValid.includes(false));
  }

  render() {
    const {
      currentSections, childSectionRefs, sectionsContent,
    } = this.state;
    return (
      <Accordion allowToggle w="80%" h="100%">
        <AccordionItem>
          <AccordionButton>
            <Text flex="1" textAlign="left">
              Contenu du cours
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack align="left" pl="1%">
              {currentSections.map((section, index) => (
                <SectionClass
                  ref={childSectionRefs[index]}
                  isLast={(currentSections.length - 1 === index)}
                  removeSection={(ir:number) => { this.removeSection(ir); }}
                  updateSection={(idx, isValid, s) => {
                    this.updateSectionValid(idx, isValid, s);
                  }}
                  addSection={() => this.addSection()}
                  section={section}
                  index={index}
                  sectionsContent={sectionsContent}
                  key={`Section${section.id}`}
                />
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

    );
  }
}
