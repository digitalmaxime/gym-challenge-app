/* eslint-disable no-nested-ternary */
import {
  VStack, Box, FormControl, Image,
  FormLabel, HStack, Switch,
  Tag, TagCloseButton, Text, TagLabel, Textarea, Accordion,
  AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
} from '@chakra-ui/react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import {
  AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import React, { ChangeEvent } from 'react';
import { httpsCallable } from 'firebase/functions';
import { auth, firebaseFunctionsEmulator, storageEmulator } from '../../pages/global';
import { InputHintOk, InputNoHoverShadow } from '../../styles/InputHint';
import { GeneralContent } from '../CourseModificationComponent';

interface ValidInputs {
  title: boolean,
  sigle: boolean,
  tags: boolean,
  details: boolean,
  password: boolean,
}

interface GeneralContentState {
  currentGeneralContent: GeneralContent,
  generalContent: GeneralContent,
  availableContributors: string[],
  inputValidation: ValidInputs,
  isProtectedByPassword: boolean,
  currentTagField: string,
}

interface CourseGeneralInformationProps {
  generalContent: GeneralContent,
  allFieldValidTrigger: (allvalid: boolean) => void,
}

class CourseGeneralInformation extends React.Component<CourseGeneralInformationProps,
GeneralContentState> {
  listTeacherEmails = httpsCallable(firebaseFunctionsEmulator, 'listTeacherEmails');

  allFieldValidTrigger: (allvalid: boolean) => void;

  constructor(props: CourseGeneralInformationProps) {
    super(props);
    const generalContent = {
      contributors: props.generalContent.contributors,
      id: props.generalContent.id,
      courseNumber: props.generalContent.courseNumber,
      courseTitle: props.generalContent.courseTitle,
      details: props.generalContent.courseTitle,
      imageUrl: props.generalContent.imageUrl,
      password: props.generalContent.password,
      tags: props.generalContent.tags,
    };
    const TagsCopy:string[] = [];
    props.generalContent.tags.forEach((tag) => { TagsCopy.push(tag); });
    const ContributorsCopy:string[] = [];
    props.generalContent.contributors.forEach((contrib) => { ContributorsCopy.push(contrib); });
    const currentGeneralContent = {
      contributors: ContributorsCopy,
      id: props.generalContent.id,
      courseNumber: props.generalContent.courseNumber,
      courseTitle: props.generalContent.courseTitle,
      details: props.generalContent.courseTitle,
      imageUrl: props.generalContent.imageUrl,
      password: props.generalContent.password,
      tags: TagsCopy,
    };
    const validInputs = {
      title: true,
      sigle: true,
      tags: true,
      details: true,
      password: true,
    };
    this.allFieldValidTrigger = props.allFieldValidTrigger;
    this.state = {
      currentGeneralContent,
      inputValidation: validInputs,
      generalContent,
      isProtectedByPassword: false,
      currentTagField: '',
      availableContributors: [],
    };
  }

  componentDidMount() {
    this.listTeacherEmails({}).then((result) => {
      const availableContributors = result.data as string[];
      const findEmail = (email: string) => email === auth.currentUser?.email;
      const idx = availableContributors.findIndex(findEmail);
      availableContributors.splice(idx, 1);
      this.setState({ availableContributors });
    });
  }

  static getDerivedStateFromProps(props:CourseGeneralInformationProps, state:GeneralContentState) {
    const generalContent = {
      contributors: props.generalContent.contributors,
      id: props.generalContent.id,
      courseNumber: props.generalContent.courseNumber,
      courseTitle: props.generalContent.courseTitle,
      details: props.generalContent.courseTitle,
      imageUrl: props.generalContent.imageUrl,
      password: props.generalContent.password,
      tags: props.generalContent.tags,
    };
    const TagsCopy:string[] = [];
    props.generalContent.tags.forEach((tag) => { TagsCopy.push(tag); });
    const ContributorsCopy:string[] = [];
    props.generalContent.contributors.forEach((contrib) => { ContributorsCopy.push(contrib); });
    const currentGeneralContent = {
      contributors: ContributorsCopy,
      id: props.generalContent.id,
      courseNumber: props.generalContent.courseNumber,
      courseTitle: props.generalContent.courseTitle,
      details: props.generalContent.courseTitle,
      imageUrl: props.generalContent.imageUrl,
      password: props.generalContent.password,
      tags: TagsCopy,
    };
    const validInputs = {
      title: true,
      sigle: true,
      tags: true,
      details: true,
      password: true,
    };

    if (state.generalContent.id !== props.generalContent.id) {
      return {
        currentGeneralContent,
        inputValidation: validInputs,
        generalContent,
        isProtectedByPassword: false,
        currentTagField: '',
      };
    }
    return null;
  }

  handleChangeFile(e:ChangeEvent<HTMLInputElement>) {
    const { currentGeneralContent } = this.state;
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const newId = `${uuidv4()}${file?.name}`;
      const storageRef = ref(storageEmulator, newId);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          currentGeneralContent.imageUrl = url;
          this.setState({ currentGeneralContent });
        });
      });
    }
  }

  handlePasswordInput(e: ChangeEvent<HTMLInputElement>) {
    const { currentGeneralContent, inputValidation } = this.state;
    inputValidation.password = e.target.value.length >= 8;
    currentGeneralContent.password = e.target.value;
    this.setState({
      inputValidation,
      currentGeneralContent,
    });
  }

  handleVisiblityChange(e: ChangeEvent<HTMLInputElement>) {
    const { currentGeneralContent, inputValidation } = this.state;
    inputValidation.password = !e.target.checked;
    currentGeneralContent.password = '';
    this.setState({
      isProtectedByPassword: e.target.checked,
      inputValidation,
      currentGeneralContent,
    }, () => { this.allInputsValid(); });
  }

  handleDeleteTag(index: number) {
    const { currentGeneralContent, inputValidation } = this.state;
    currentGeneralContent.tags.splice(index, 1);
    inputValidation.tags = currentGeneralContent.tags.length >= 3;
    this.setState({
      inputValidation,
      currentGeneralContent,
    }, () => { this.allInputsValid(); });
  }

  handleTagsUserInput(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ currentTagField: e.target.value });
  }

  handleTagsOnSubmit(e: KeyboardEvent) {
    const { currentTagField, currentGeneralContent, inputValidation } = this.state;
    if (e.key === 'Enter' && !(currentGeneralContent.tags.includes(currentTagField)) && currentTagField.length > 0) {
      currentGeneralContent.tags.push(currentTagField);
      inputValidation.tags = currentGeneralContent.tags.length >= 3;
      this.setState({
        inputValidation,
        currentGeneralContent,
        currentTagField: '',
      }, () => { this.allInputsValid(); });
    }
  }

  handleContributorClick(v: string) {
    const { currentGeneralContent } = this.state;
    if (!(currentGeneralContent.contributors.includes(v))) {
      currentGeneralContent.contributors.push(v);
      this.setState({ currentGeneralContent });
    }
  }

  handleDeleteContributorTag(index: number) {
    const { currentGeneralContent } = this.state;
    currentGeneralContent.contributors.splice(index, 1);
    this.setState({ currentGeneralContent });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  getState() {
    const { currentGeneralContent } = this.state;
    return currentGeneralContent;
  }

  titleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const { currentGeneralContent, inputValidation } = this.state;
    inputValidation.title = newTitle.length >= 5;
    currentGeneralContent.courseTitle = newTitle;
    this.setState({
      inputValidation,
      currentGeneralContent,
    });
  };

  descriptionInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    const { currentGeneralContent } = this.state;
    currentGeneralContent.details = newDescription;
    this.setState({
      currentGeneralContent,
    });
  };

  allInputsValid = () => {
    const { inputValidation } = this.state;
    this.allFieldValidTrigger(inputValidation.title && inputValidation.sigle
    && inputValidation.tags && inputValidation.details && inputValidation.password);
  };

  render() {
    const {
      currentGeneralContent, generalContent, availableContributors,
      inputValidation, currentTagField, isProtectedByPassword,
    } = this.state;

    const titleInputColor = !inputValidation.title ? 'red' : generalContent.courseTitle === currentGeneralContent.courseTitle ? 'black' : 'orange';
    const tagsInputColor = !inputValidation.tags ? 'red' : JSON.stringify(generalContent.tags) === JSON.stringify(currentGeneralContent.tags) ? 'black' : 'orange';
    const descriptionInputColor = generalContent.details === currentGeneralContent.details ? 'black' : 'orange';
    const passwordInputColor = !inputValidation.password ? 'red' : generalContent.password === currentGeneralContent.password ? 'black' : 'orange';
    const contributorsInputColor = JSON.stringify(generalContent.contributors) === JSON.stringify(currentGeneralContent.contributors) ? 'black' : 'orange';

    return (
      <Accordion allowToggle w="80%">
        <AccordionItem>
          <AccordionButton>
            <Text flex="1" textAlign="left">
              Informations générales
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <HStack align="Top">
              <VStack align="" p={8}>
                <Text pb={2} fontSize="2xl" textAlign="left">Titre</Text>
                <Text color="grey" textAlign="left">Le titre du cours. Ce champ sera utilisé pour faire la recherche de cours.</Text>
              </VStack>

              <Box pt="5.75%">
                <InputNoHoverShadow
                  placeholder="Titre"
                  borderBottom="1px"
                  borderTop="none"
                  borderRight="none"
                  borderLeft="none"
                  borderRadius="0"
                  position="absolute"
                  right="15%"
                  width="300px"
                  borderColor={titleInputColor}
                  onChange={this.titleInputChange}
                  value={currentGeneralContent.courseTitle}
                />
              </Box>

            </HStack>

            <HStack>
              <VStack align="" p={8}>
                <Text pb={2} fontSize="2xl" textAlign="left">Image du cours</Text>
                <Text color="grey" textAlign="left">L&apos;image du cours sera visible par les étudiants.</Text>
              </VStack>

              <HStack width="100%">

                <InputHintOk type="file" onChange={(e:ChangeEvent<HTMLInputElement>) => { this.handleChangeFile(e); }} />
                <Box width="1%" />
                <Image maxHeight="200" maxWidth="400" src={currentGeneralContent.imageUrl} />
              </HStack>
            </HStack>

            <HStack align="Top">
              <VStack align="" p={8}>
                <Text pb={2} fontSize="2xl" textAlign="left">Étiquettes</Text>
                <Text color="grey" textAlign="left">Créez des étiquettes supplémentaires pour ajouter des termes afin de faciliter la recherche de cours.</Text>
                <Text pb={3} color="grey" textAlign="left">Exemple : Sigle du cours, nom de l&apos;université...</Text>

                <FormControl display="flex" alignItems="center" p="5">
                  { currentGeneralContent.tags.map((tag, index) => (
                    <Tag m={1} key={tag} colorScheme="blue">
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => this.handleDeleteTag(index)} />
                    </Tag>
                  ))}

                </FormControl>

              </VStack>

              <Box pt="5.75%">
                <InputNoHoverShadow
                  placeholder="Étiquette"
                  borderTop="none"
                  borderRight="none"
                  borderLeft="none"
                  borderRadius="0"
                  position="absolute"
                  right="15%"
                  width="300px"
                  borderColor={tagsInputColor}
                  onKeyDown={(e: KeyboardEvent) => this.handleTagsOnSubmit(e)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleTagsUserInput(e)}
                  value={currentTagField}
                />
              </Box>
            </HStack>

            <HStack align="Top">
              <VStack align="" p={8}>
                <Text pb={2} fontSize="2xl" textAlign="left">Description</Text>
                <Text pb={8} color="grey" textAlign="left">
                  Ajoutez une courte description du cours et des activités sur
                  l’application.

                </Text>

              </VStack>

              <Box pt="6.75%">
                <Textarea
                  placeholder="description"
                  borderRadius="0"
                  position="absolute"
                  right="15%"
                  width="300px"
                  borderColor={descriptionInputColor}
                  onChange={this.descriptionInputChange}
                  value={currentGeneralContent.details}
                />
              </Box>
            </HStack>

            <HStack align="Top">
              <VStack align="" p={8}>
                <Text pb={2} fontSize="2xl" textAlign="left">Visibilité</Text>
                <Text pb={8} color="grey" textAlign="left">En marquant le cours comme privé, il est possible d’ajouter un mot de passe pour bloquer l’accès du cours.</Text>
              </VStack>

              <FormControl display="flex" alignItems="center" pt={6}>
                <Switch colorScheme="blue" pr="2" checked={isProtectedByPassword} onChange={(e) => this.handleVisiblityChange(e)} />
                <FormLabel m="0">
                  Privé
                </FormLabel>
                <InputNoHoverShadow
                  disabled={!isProtectedByPassword}
                  placeholder="Mot de passe"
                  borderBottom="1px"
                  borderTop="none"
                  borderRight="none"
                  borderLeft="none"
                  borderRadius="0"
                  borderColor={passwordInputColor}
                  position="absolute"
                  right="14%"
                  width="200px"
                  onChange={(e:ChangeEvent<HTMLInputElement>) => this.handlePasswordInput(e)}
                  value={currentGeneralContent.password}
                />

              </FormControl>

            </HStack>

            <HStack align="Top">
              <VStack align="" p={8}>
                <Text pb={2} fontSize="2xl" textAlign="left">Contributeurs</Text>
                <Text pb={4} color="grey" textAlign="left">Ajoutez des contributeurs au cours pour qu’ils puissent apporter des modifications au contenu.</Text>

                <FormControl display="flex" alignItems="center" p="5">
                  { currentGeneralContent.contributors.map((tag, index) => (
                    tag !== auth.currentUser?.email
                      ? (
                        <Tag key={tag} colorScheme="blue">
                          <TagLabel>{tag}</TagLabel>
                          <TagCloseButton onClick={() => this.handleDeleteContributorTag(index)} />
                        </Tag>
                      ) : (null)
                  ))}
                </FormControl>

              </VStack>

              <Box pt="5.75%">
                <AutoComplete openOnFocus maxSuggestions={4}>
                  <AutoCompleteInput
                    borderRadius="0"
                    borderColor={contributorsInputColor}
                    borderTop="none"
                    borderRight="none"
                    borderLeft="none"
                    borderBottom="1px"
                    position="absolute"
                    right="15%"
                    width="300px"
                    variant="filled"
                    placeholder="email.contibuteur@polymt.ca"
                  />
                  <AutoCompleteList position="absolute" right="15%" width="300px" marginTop="45px">
                    {availableContributors.map((email) => (
                      <AutoCompleteItem
                        key={`option-${email}`}
                        value={email}
                        onClick={() => { this.handleContributorClick(email); }}
                      >
                        {email}
                      </AutoCompleteItem>
                    ))}
                  </AutoCompleteList>
                </AutoComplete>
              </Box>
            </HStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

    );
  }
}

export default CourseGeneralInformation;
