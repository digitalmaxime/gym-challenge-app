import React, { ChangeEvent, KeyboardEvent } from 'react';
import {
  Box, Text, HStack, VStack, Input, Image, Textarea, Button, InputGroup,
  InputLeftAddon, Divider, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
  Highlight, Heading, InputRightElement, IconButton, Tooltip,
} from '@chakra-ui/react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import {
  AddIcon, DeleteIcon, SmallCloseIcon, WarningIcon,
} from '@chakra-ui/icons';
import Question from '../../utils/Question';
import QuestionEnum from '../../utils/QuestionEnum';
import { storageEmulator } from '../../pages/global';

export interface QuestionClassProp {
  question: Question,
  index: number,
  isLast: boolean,
  defaultOpen: boolean,
  addQuestion : (n: number) => void,
  removeQuestion : (index: number) => void,
  toggleOpenQuestion : (index: number) => void,
  updateQuestion : (index: number, q: Question) => void,
}

interface QuestionClassState {
  currentQuestion : Question,
  defaultOpen: boolean,
  tempOtherAnswerValue: string,
  tempCorrectAnswerValue: string,
  currentIndex: number,
}

export class QuestionClass extends React.Component<QuestionClassProp, QuestionClassState> {
  addQuestion : (n: number) => void;

  thisRemoveQuestion: (index: number) => void;

  thisUpdateQuestion: (index: number, s: Question) => void;

  toggleIsSelected: (n:number) => void;

  constructor(props: QuestionClassProp) {
    super(props);
    this.state = {
      currentQuestion: props.question,
      defaultOpen: props.defaultOpen,
      tempOtherAnswerValue: '',
      tempCorrectAnswerValue: '',
      currentIndex: props.index,
    };
    this.thisUpdateQuestion = props.updateQuestion;
    this.thisRemoveQuestion = props.removeQuestion;
    this.toggleIsSelected = props.toggleOpenQuestion;
    this.addQuestion = props.addQuestion;
  }

  handleDeleteQuestion = () => {
    const { currentIndex } = this.state;
    this.thisRemoveQuestion(currentIndex);
  };

  handleChangeQuestionName = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentQuestion } = this.state;
    currentQuestion.name = e.target.value;
    this.setState({ currentQuestion });
  };

  handleChangeMCQTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { currentQuestion } = this.state;
    currentQuestion.questionText = e.target.value;
    this.setState({ currentQuestion });
  };

  handleChangeBrokenSentenceQuestionText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { currentQuestion } = this.state;
    currentQuestion.questionText = e.target.value;
    const re = /\$_\$/gm;
    const nbHoles = ((currentQuestion.questionText || '').match(re) || []).length;
    if (nbHoles >= 1) {
      const amountToDelete = currentQuestion.correctAnswers.length - nbHoles;
      currentQuestion.correctAnswers.splice(nbHoles, amountToDelete);
    }
    const remainingNbHoles = ((currentQuestion.questionText || '').match(re) || []).length;
    if (remainingNbHoles === 0) {
      const re1 = /\$_/gm;
      const re2 = /\$/gm;
      const re3 = /_/gm;
      currentQuestion.questionText = currentQuestion.questionText.replace(re1, '').replace(re2, '').replace(re3, '');
      currentQuestion.questionText += '$_$';
    }
    this.setState({ currentQuestion });
  };

  handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentQuestion, currentIndex } = this.state;
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const newId = `${uuidv4()}${file.name}`;
      const storageRef = ref(storageEmulator, newId);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          currentQuestion.imageUri = url;
          this.setState({ currentQuestion }, () => {
            this.thisUpdateQuestion(currentIndex, currentQuestion);
          });
        });
      });
    }
  };

  handleCorrectAnswerFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ tempCorrectAnswerValue: e.target.value });
  };

  handleCorrectAnswerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { currentQuestion, tempCorrectAnswerValue, currentIndex } = this.state;
    const re = /\$_\$/gm;
    const nbHoles = ((currentQuestion.questionText || '').match(re) || []).length;
    if (e.key === 'Enter') {
      if (tempCorrectAnswerValue !== ''
      && !currentQuestion.correctAnswers.includes(tempCorrectAnswerValue)
      && !currentQuestion.otherAnswers.includes(tempCorrectAnswerValue)
      && currentQuestion.correctAnswers.length < nbHoles) {
        currentQuestion.correctAnswers.push(tempCorrectAnswerValue);
        this.thisUpdateQuestion(currentIndex, currentQuestion);
        this.setState({ tempCorrectAnswerValue: '' });
      }
    }
    this.setState({ currentQuestion });
  };

  handleCorrectAnswerKeyDownNoHole = (e: KeyboardEvent<HTMLInputElement>) => {
    const { currentQuestion, tempCorrectAnswerValue, currentIndex } = this.state;
    let limit = 5;
    if (currentQuestion.type === QuestionEnum.OBSERVE_AND_IDENTIFY) { limit = 8; }
    if (e.key === 'Enter') {
      if (tempCorrectAnswerValue !== ''
      && !currentQuestion.correctAnswers.includes(tempCorrectAnswerValue)
      && !currentQuestion.otherAnswers.includes(tempCorrectAnswerValue)
      && (currentQuestion.correctAnswers.length + currentQuestion.otherAnswers.length) < limit) {
        currentQuestion.correctAnswers.push(tempCorrectAnswerValue);
        this.thisUpdateQuestion(currentIndex, currentQuestion);
        this.setState({ tempCorrectAnswerValue: '' });
      }
    }
    this.setState({ currentQuestion });
  };

  handleCorrectAnswerAddButton = () => {
    const {
      currentQuestion, tempCorrectAnswerValue, currentIndex,
    } = this.state;
    const re = /\$_\$/gm;
    const nbHoles = ((currentQuestion.questionText || '').match(re) || []).length;
    if (tempCorrectAnswerValue !== ''
    && !currentQuestion.correctAnswers.includes(tempCorrectAnswerValue)
    && !currentQuestion.otherAnswers.includes(tempCorrectAnswerValue)
    && currentQuestion.correctAnswers.length < nbHoles) {
      currentQuestion.correctAnswers.push(tempCorrectAnswerValue);
      this.thisUpdateQuestion(currentIndex, currentQuestion);
      this.setState({ tempCorrectAnswerValue: '' });
    }
  };

  handleCorrectAnswerAddButtonNoHole = () => {
    const { currentQuestion, tempCorrectAnswerValue, currentIndex } = this.state;
    let limit = 5;
    if (currentQuestion.type === QuestionEnum.OBSERVE_AND_IDENTIFY) { limit = 8; }
    if (tempCorrectAnswerValue !== ''
      && !currentQuestion.correctAnswers.includes(tempCorrectAnswerValue)
      && !currentQuestion.otherAnswers.includes(tempCorrectAnswerValue)
      && (currentQuestion.correctAnswers.length + currentQuestion.otherAnswers.length) < limit) {
      currentQuestion.correctAnswers.push(tempCorrectAnswerValue);
      this.thisUpdateQuestion(currentIndex, currentQuestion);
      this.setState({ tempCorrectAnswerValue: '' });
    }
    this.setState({ currentQuestion });
  };

  handleAddHoleToQuestionText = () => {
    const { currentQuestion, currentIndex } = this.state;
    if (currentQuestion.questionText.at(-1) !== ' ') {
      currentQuestion.questionText += ' ';
    }
    currentQuestion.questionText += '$_$ ';
    this.thisUpdateQuestion(currentIndex, currentQuestion);
  };

  handleDecoyAnswerFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ tempOtherAnswerValue: e.target.value });
  };

  handleDecoyAnswerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const {
      currentQuestion, tempOtherAnswerValue, currentIndex,
    } = this.state;
    if (e.key === 'Enter') {
      if (tempOtherAnswerValue !== ''
      && !currentQuestion.otherAnswers.includes(tempOtherAnswerValue)
      && !currentQuestion.correctAnswers.includes(tempOtherAnswerValue)) {
        currentQuestion.otherAnswers.push(tempOtherAnswerValue);
        this.thisUpdateQuestion(currentIndex, currentQuestion);
        this.setState({ tempOtherAnswerValue: '' });
      }
    }
  };

  handleDecoyAnswerAddButton = () => {
    const {
      currentQuestion, tempOtherAnswerValue, currentIndex,
    } = this.state;
    if (tempOtherAnswerValue !== ''
    && !currentQuestion.otherAnswers.includes(tempOtherAnswerValue)
    && !currentQuestion.correctAnswers.includes(tempOtherAnswerValue)) {
      currentQuestion.otherAnswers.push(tempOtherAnswerValue);
      this.thisUpdateQuestion(currentIndex, currentQuestion);
      this.setState({ tempOtherAnswerValue: '' });
    }
  };

  handleDecoyAnswerKeyDownNoHole = (e: KeyboardEvent<HTMLInputElement>) => {
    const {
      currentQuestion, tempOtherAnswerValue, currentIndex,
    } = this.state;
    let limit = 5;
    if (currentQuestion.type === QuestionEnum.OBSERVE_AND_IDENTIFY) { limit = 8; }
    if (e.key === 'Enter') {
      if (tempOtherAnswerValue !== ''
      && !currentQuestion.otherAnswers.includes(tempOtherAnswerValue)
      && !currentQuestion.correctAnswers.includes(tempOtherAnswerValue)
      && (currentQuestion.correctAnswers.length + currentQuestion.otherAnswers.length) < limit) {
        currentQuestion.otherAnswers.push(tempOtherAnswerValue);
        this.thisUpdateQuestion(currentIndex, currentQuestion);
        this.setState({ tempOtherAnswerValue: '' });
      }
    }
  };

  handleDecoyAnswerAddButtonNoHole = () => {
    const {
      currentQuestion, tempOtherAnswerValue, currentIndex,
    } = this.state;
    let limit = 5;
    if (currentQuestion.type === QuestionEnum.OBSERVE_AND_IDENTIFY) { limit = 8; }
    if (tempOtherAnswerValue !== ''
    && !currentQuestion.otherAnswers.includes(tempOtherAnswerValue)
    && !currentQuestion.correctAnswers.includes(tempOtherAnswerValue)
    && (currentQuestion.correctAnswers.length + currentQuestion.otherAnswers.length) < limit) {
      currentQuestion.otherAnswers.push(tempOtherAnswerValue);
      this.thisUpdateQuestion(currentIndex, currentQuestion);
      this.setState({ tempOtherAnswerValue: '' });
    }
  };

  handleRemoveCorrectAnswer = (e: string) => {
    const { currentQuestion, currentIndex } = this.state;
    if (currentQuestion.correctAnswers.length === 1) { return; }
    const index = currentQuestion.correctAnswers.indexOf(e);
    currentQuestion.correctAnswers.splice(index, 1);
    this.thisUpdateQuestion(currentIndex, currentQuestion);
    this.setState({ currentQuestion });
  };

  handleRemoveOtherAnswer = (e: string) => {
    const { currentQuestion, currentIndex } = this.state;
    if (currentQuestion.otherAnswers.length === 1) { return; }
    const index = currentQuestion.otherAnswers.indexOf(e);
    currentQuestion.otherAnswers.splice(index, 1);
    this.thisUpdateQuestion(currentIndex, currentQuestion);
    this.setState({ currentQuestion });
  };

  updateDataToParent() {
    const { currentQuestion, currentIndex } = this.state;
    this.thisUpdateQuestion(currentIndex, currentQuestion);
  }

  render() {
    const {
      currentQuestion, defaultOpen,
      tempOtherAnswerValue, tempCorrectAnswerValue,
    } = this.state;
    const {
      index, isLast, question,
    } = this.props;

    const MultipleChoiceQuestion = (
      <Box bg="white" padding="5">
        <VStack align="left">
          <VStack align="left">
            <Heading fontSize="md" textAlign="left">Question de type Choix Multiples - Entrez l&apos;énoncé de la question et les éléments de bonnes et mauvaises réponses.</Heading>
            <Textarea fontSize="xl" w="100%" value={currentQuestion.questionText} onChange={this.handleChangeMCQTextArea} onBlur={() => { this.updateDataToParent(); }} />
          </VStack>

          <HStack align="left">
            <VStack align="left" w="50%">
              <HStack>
                <Text textAlign="left">Entrer des elements de bonne réponse:</Text>

                <Tooltip
                  label="Veuillez faire attention aux bonnes et mauvaises réponses que vous entrez.
                  La réponse ne doit pas être un duplicat d'une réponse existante (bonne ou mauvaise).
                  Le nombre de réponses est limité à 5 pour les questions du type choix multiple"
                  fontSize="md"
                >
                  <WarningIcon />
                </Tooltip>
              </HStack>
              <InputGroup>
                <Input
                  placeholder="entrez une bonne réponse"
                  value={tempCorrectAnswerValue}
                  onChange={this.handleCorrectAnswerFieldChange}
                  onKeyDown={this.handleCorrectAnswerKeyDownNoHole}
                />
                <InputRightElement>
                  <IconButton onClick={this.handleCorrectAnswerAddButtonNoHole} size="sm" icon={<AddIcon color="green.500" />} aria-label="Ajouter le mot" />
                </InputRightElement>
              </InputGroup>
              <Text textAlign="left">Mots présentement dans la banque de bonnes réponses:</Text>
              <Text textAlign="left" fontSize="xs">Cliquez pour effacer le mot de la liste.</Text>
              {currentQuestion.correctAnswers?.map((item) => (
                <Button key={item} size="sm" onClick={() => this.handleRemoveCorrectAnswer(item)}>
                  <SmallCloseIcon />
                  {item}
                </Button>
              ))}
            </VStack>
            <VStack align="left" w="50%">

              <Text textAlign="left">Entrer des réponses qui serviront de leurres:</Text>
              <InputGroup>
                <Input
                  placeholder="entrez une fausse réponse"
                  value={tempOtherAnswerValue}
                  onChange={this.handleDecoyAnswerFieldChange}
                  onKeyDown={this.handleDecoyAnswerKeyDownNoHole}
                />
                <InputRightElement>
                  <IconButton onClick={this.handleDecoyAnswerAddButtonNoHole} size="sm" icon={<AddIcon color="yellow.500" />} aria-label="Ajouter le mot" />
                </InputRightElement>
              </InputGroup>
              <Text textAlign="left">Mots présentement dans la banque de réponses invalides:</Text>
              <Text textAlign="left" fontSize="xs">Cliquez pour effacer le mot de la liste.</Text>
              {currentQuestion.otherAnswers?.map((item) => (
                <Button key={item} size="sm" onClick={() => this.handleRemoveOtherAnswer(item)}>
                  <SmallCloseIcon />
                  {item}
                </Button>
              ))}
            </VStack>
          </HStack>
        </VStack>
      </Box>
    );

    const TextholeQuestion = (
      <Box bg="white" padding="5">
        <VStack align="left">
          <Heading fontSize="md">
            <Highlight
              query="$_$"
              styles={{
                px: '2', py: '1', rounded: 'full', bg: 'red.100',
              }}
            >
              Question de type Phrase Trouée - Entrer l&apos;énoncé de la question en
              remplaçant les éléments à trouer par la séquence $_$. L&apos;étudiant
              completera les éléments de réponse en choisissant parmi une liste.
            </Highlight>
          </Heading>
          <VStack align="left">
            <Text textAlign="left" fontSize="lg">Entrer le texte que vous voulez trouer</Text>
            <Textarea fontSize="md" w="100%" value={currentQuestion.questionText} onChange={this.handleChangeBrokenSentenceQuestionText} onBlur={() => { this.updateDataToParent(); }} />
            <Button size="sm" onClick={this.handleAddHoleToQuestionText}>Ajouter un trou $_$</Button>
          </VStack>
          <Divider />
          <HStack align="left">
            <VStack align="left" w="50%">
              <HStack>
                <Text textAlign="left">Entrer des elements de bonne réponse:</Text>

                <Tooltip
                  label="Veuillez faire attention aux bonnes réponses que vous entrez.
                  La réponse ne doit pas être un duplicat d'une réponse existante (bonne ou mauvaise).
                  Le nombre de bonnes réponses ne peut pas dépasser le nombre de trou (séquences $_$) dans l'énoncé de la question"
                  fontSize="md"
                >
                  <WarningIcon />
                </Tooltip>
              </HStack>
              <InputGroup>
                <Input
                  placeholder="entrez une bonne réponse"
                  value={tempCorrectAnswerValue}
                  onChange={this.handleCorrectAnswerFieldChange}
                  onKeyDown={this.handleCorrectAnswerKeyDown}
                />
                <InputRightElement>
                  <IconButton onClick={this.handleCorrectAnswerAddButton} size="sm" icon={<AddIcon color="green.500" />} aria-label="Ajouter le mot" />
                </InputRightElement>
              </InputGroup>
              <Text textAlign="left">Mots présentement dans la banque de bonnes réponses:</Text>
              <Text textAlign="left" fontSize="xs">Cliquez pour effacer le mot de la liste.</Text>
              {currentQuestion.correctAnswers?.map((item) => (
                <Button key={item} size="sm" onClick={() => this.handleRemoveCorrectAnswer(item)}>
                  <SmallCloseIcon />
                  {item}
                </Button>
              ))}
            </VStack>
            <VStack align="left" w="50%">

              <Text textAlign="left">Entrer des réponses qui serviront de leurres:</Text>
              <InputGroup>
                <Input
                  placeholder="entrez une fausse réponse"
                  value={tempOtherAnswerValue}
                  onChange={this.handleDecoyAnswerFieldChange}
                  onKeyDown={this.handleDecoyAnswerKeyDown}
                />
                <InputRightElement>
                  <IconButton onClick={this.handleDecoyAnswerAddButton} size="sm" icon={<AddIcon color="yellow.500" />} aria-label="Ajouter le mot" />
                </InputRightElement>
              </InputGroup>
              <Text textAlign="left">Mots présentement dans la banque de réponses invalides:</Text>
              <Text textAlign="left" fontSize="xs">Cliquez pour effacer le mot de la liste.</Text>
              {currentQuestion.otherAnswers?.map((item) => (
                <Button key={item} size="sm" onClick={() => this.handleRemoveOtherAnswer(item)}>
                  <SmallCloseIcon />
                  {item}
                </Button>
              ))}
            </VStack>
          </HStack>
        </VStack>
      </Box>
    );
    const ObservingQuestion = (
      <Box bg="white" padding="5">
        <VStack align="left">
          <Heading fontSize="md" textAlign="left">Question de type Observer et Identifier - Entrez la question et/ou donnez une image et les éléments de réponse corespondants.</Heading>
          <Textarea fontSize="xl" w="100%" value={currentQuestion.questionText} onChange={this.handleChangeMCQTextArea} onBlur={() => { this.updateDataToParent(); }} />
          <Text textAlign="left">Image de la question</Text>
          <input type="file" onChange={this.handleFileChange} />
          <Image src={currentQuestion.imageUri} />
          <Divider />
          <HStack align="left">
            <VStack align="left" w="50%">
              <HStack>
                <Text textAlign="left">Entrer des elements de bonne réponse:</Text>

                <Tooltip
                  label="Veuillez faire attention aux bonnes et mauvaises réponses que vous entrez.
                  La réponse ne doit pas être un duplicat d'une réponse existante (bonne ou mauvaise).
                  Le nombre de réponses est limité à 8 pour les questions du type observer"
                  fontSize="md"
                >
                  <WarningIcon />
                </Tooltip>
              </HStack>
              <InputGroup>
                <Input
                  placeholder="entrez une bonne réponse"
                  value={tempCorrectAnswerValue}
                  onChange={this.handleCorrectAnswerFieldChange}
                  onKeyDown={this.handleCorrectAnswerKeyDownNoHole}
                />
                <InputRightElement>
                  <IconButton onClick={this.handleCorrectAnswerAddButtonNoHole} size="sm" icon={<AddIcon color="green.500" />} aria-label="Ajouter le mot" />
                </InputRightElement>
              </InputGroup>
              <Text textAlign="left">Mots présentement dans la banque de bonnes réponses:</Text>
              <Text textAlign="left" fontSize="xs">Cliquez pour effacer le mot de la liste.</Text>
              {currentQuestion.correctAnswers?.map((item) => (
                <Button key={item} size="sm" onClick={() => this.handleRemoveCorrectAnswer(item)}>
                  <SmallCloseIcon />
                  {item}
                </Button>
              ))}
            </VStack>
            <VStack align="left" w="50%">

              <Text textAlign="left">Entrer des réponses qui serviront de leurres:</Text>
              <InputGroup>
                <Input
                  placeholder="entrez une fausse réponse"
                  value={tempOtherAnswerValue}
                  onChange={this.handleDecoyAnswerFieldChange}
                  onKeyDown={this.handleDecoyAnswerKeyDownNoHole}
                />
                <InputRightElement>
                  <IconButton onClick={this.handleDecoyAnswerAddButtonNoHole} size="sm" icon={<AddIcon color="yellow.500" />} aria-label="Ajouter le mot" />
                </InputRightElement>
              </InputGroup>
              <Text textAlign="left">Mots présentement dans la banque de réponses invalides:</Text>
              <Text textAlign="left" fontSize="xs">Cliquez pour effacer le mot de la liste.</Text>
              {currentQuestion.otherAnswers?.map((item) => (
                <Button key={item} size="sm" onClick={() => this.handleRemoveOtherAnswer(item)}>
                  <SmallCloseIcon />
                  {item}
                </Button>
              ))}
            </VStack>
          </HStack>
        </VStack>
      </Box>
    );
    const CompletingQuestion = (
      <Box bg="white" padding="5">
        <VStack align="left">
          <Heading fontSize="md">
            <Highlight
              query="$_$"
              styles={{
                px: '2', py: '1', rounded: 'full', bg: 'red.100',
              }}
            >
              Question de type Completer - Entrez l&apos;énoncé de la question en remplaçant les
              éléments à completer par la séquence $_$. L&apos;étudiant completera les éléments
              de réponse  à l&apos;aide du clavier.
            </Highlight>
          </Heading>
          <Textarea fontSize="md" w="100%" value={currentQuestion.questionText} onChange={this.handleChangeBrokenSentenceQuestionText} onBlur={() => { this.updateDataToParent(); }} />
          <Button size="sm" onClick={this.handleAddHoleToQuestionText}>Ajouter un trou $_$</Button>
          <Divider />
          <HStack align="left">
            <VStack align="left" w="100%">
              <HStack>
                <Text textAlign="left">Entrer des elements de bonne réponse:</Text>

                <Tooltip
                  label="Veuillez faire attention aux bonnes réponses que vous entrez.
                  La réponse ne doit pas être un duplicat d'une réponse existante.
                  Le nombre de bonnes réponses ne peut pas dépasser le nombre de trou (séquences $_$) dans l'énoncé de la question"
                  fontSize="md"
                >
                  <WarningIcon />
                </Tooltip>
              </HStack>
              <InputGroup>
                <Input
                  placeholder="entrez une bonne réponse"
                  value={tempCorrectAnswerValue}
                  onChange={this.handleCorrectAnswerFieldChange}
                  onKeyDown={this.handleCorrectAnswerKeyDown}
                />
                <InputRightElement>
                  <IconButton onClick={this.handleCorrectAnswerAddButton} size="sm" icon={<AddIcon color="green.500" />} aria-label="Ajouter le mot" />
                </InputRightElement>
              </InputGroup>
              <Text textAlign="left">Mots présentement dans la banque de bonnes réponses:</Text>
              <Text textAlign="left" fontSize="xs">Cliquez pour effacer le mot de la liste.</Text>
              {currentQuestion.correctAnswers?.map((item) => (
                <Button key={item} size="sm" onClick={() => this.handleRemoveCorrectAnswer(item)}>
                  <SmallCloseIcon />
                  {item}
                </Button>
              ))}
            </VStack>
          </HStack>
        </VStack>
      </Box>
    );

    return (
      <VStack w="100%" align="left">
        <Accordion allowToggle bg="blue.400" defaultIndex={defaultOpen ? [0] : []}>
          <AccordionItem>
            <AccordionButton onClick={() => {
              this.toggleIsSelected(index);
              this.setState({ defaultOpen: !defaultOpen });
            }}
            >
              <Text flex="1" textAlign="left">
                {question.name}
              </Text>
              {index === 0 && isLast
                ? (null)
                : <DeleteIcon onClick={this.handleDeleteQuestion} />}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>

              <InputGroup size="sm" w="70%" m="2">
                <InputLeftAddon color="gray.800">Nom de la question</InputLeftAddon>
                <Input textAlign="left" bg="white" onChange={this.handleChangeQuestionName} placeholder={question.name} onBlur={() => { this.updateDataToParent(); }} />
              </InputGroup>

              {currentQuestion.type === 0 ? MultipleChoiceQuestion : null}
              {currentQuestion.type === 1 ? ObservingQuestion : null}
              {currentQuestion.type === 2 ? CompletingQuestion : null}
              {currentQuestion.type === 3 ? TextholeQuestion : null}

            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionPanel />
          </AccordionItem>
        </Accordion>

        {isLast
          ? (
            <HStack>
              <Button color="gray.800" size="sm" fontSize="sm" onClick={() => { this.addQuestion(0); }}>+ Choix multiples</Button>
              <Button color="gray.800" size="sm" fontSize="sm" onClick={() => { this.addQuestion(1); }}>+ Observer</Button>
              <Button color="gray.800" size="sm" fontSize="sm" onClick={() => { this.addQuestion(2); }}>+ Completer</Button>
              <Button color="gray.800" size="sm" fontSize="sm" onClick={() => { this.addQuestion(3); }}>+ Phrase trouée</Button>
            </HStack>
          )
          : null}
      </VStack>

    );
  }
}
