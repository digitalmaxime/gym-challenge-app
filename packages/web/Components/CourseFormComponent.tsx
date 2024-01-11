import {
  VStack, Text, Button, createStandaloneToast, Box, Spinner,
} from '@chakra-ui/react';

import React, { RefObject } from 'react';
import { httpsCallable } from 'firebase/functions';
import BoxCard from '../styles/boxCard';
import { auth, firebaseFunctionsEmulator } from '../pages/global';
import { FormTitleCard } from './FormComponents/TitleComponent';
import FormTagsCard from './FormComponents/TagsComponent';
import FormDescriptionCard from './FormComponents/DescriptionComponent';
import FormVisibilityCard from './FormComponents/VisibilityComponent';
import FormContributorCard from './FormComponents/ContributorsComponent';
import { FormSigleCard } from './FormComponents/SigleComponent';
import { FormImageCard } from './FormComponents/CoursePictureComponent';

function CourseCreationCard() {
  return (
    <BoxCard>
      <Text fontSize="4xl" textAlign="left">Création d&apos;un cours</Text>
      <Text textAlign="left">Ce formulaire vous permet de créer un cours de base. Sauf contre indication, tous les champs sont nécessaires. Une fois que les champs requis sont complétés il sera possible de cliquer sur le bouton créer.</Text>
      <br />
      <Text textAlign="left">Vous pourrez ensuite retrouver le cours pour y ajouter du contenu dans la page modification.</Text>
    </BoxCard>
  );
}

interface courseCreationFormState {
  title: string,
  titleValid: boolean,
  detailsValid: boolean,
  passwordValid: boolean,
  tagsValid: boolean,
  courseNumberValid: boolean,
  details: string,
  password: string,
  tags: string[],
  courseNumber: string,
  contributors: string [],
  activeSubmnit: boolean,
  isAdding: boolean,
  uri:string,
  validUri: boolean,
}

class CourseCreationForm extends React.Component<Record<string, never>, courseCreationFormState> {
  createNewCourse = httpsCallable(firebaseFunctionsEmulator, 'registerCourse');

  imageCardRef: RefObject<FormImageCard>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-useless-constructor
  constructor(props: any) {
    super(props);
    this.state = {
      isAdding: false,
      title: '',
      titleValid: false,
      detailsValid: true,
      passwordValid: true,
      tagsValid: false,
      courseNumberValid: false,
      details: '',
      password: '',
      tags: [''],
      courseNumber: '',
      contributors: [],
      activeSubmnit: false,
      uri: '',
      validUri: true,
    };
    this.imageCardRef = React.createRef();
  }

  // eslint-disable-next-line class-methods-use-this
  globaleSetState = (type: string, isValid: boolean, data: string) => {
    const {
      titleValid, tagsValid, detailsValid, passwordValid, courseNumberValid, validUri,
    } = this.state;

    switch (type) {
      case 'TitleCard': this.setState({ title: data, titleValid: isValid, activeSubmnit: (isValid && tagsValid && detailsValid && passwordValid && courseNumberValid && validUri) });
        break;
      case 'SigleCard': this.setState({ courseNumber: data, courseNumberValid: isValid, activeSubmnit: (titleValid && tagsValid && detailsValid && passwordValid && isValid && validUri) });
        break;
      case 'TagsCard': this.setState({ tags: data.split(','), tagsValid: isValid, activeSubmnit: (titleValid && isValid && detailsValid && passwordValid && courseNumberValid && validUri) });
        break;
      case 'VisibilityCard': this.setState({ password: data, passwordValid: isValid, activeSubmnit: (titleValid && tagsValid && detailsValid && isValid && courseNumberValid && validUri) });
        break;
      case 'DescriptionCard': this.setState({ details: data, activeSubmnit: (titleValid && tagsValid && isValid && passwordValid && courseNumberValid && validUri) });
        break;
      case 'ContributorCard': this.setState({ contributors: data.split(','), activeSubmnit: (titleValid && tagsValid && detailsValid && passwordValid && courseNumberValid && validUri) });
        break;
      default: break;
    }
  };

  submitCourse = () => {
    const {
      contributors, courseNumber, title, details, password, tags,
    } = this.state;
    this.setState({
      isAdding: true,
      title: '',
      titleValid: false,
      detailsValid: true,
      passwordValid: true,
      tagsValid: false,
      courseNumberValid: false,
      details: '',
      password: '',
      tags: [''],
      courseNumber: '',
      contributors: [],
      activeSubmnit: false,
      uri: '',
      validUri: true,
    }, () => {
      if (auth.currentUser !== null) {
        this.imageCardRef.current?.saveImageToFirebase().then((url) => {
          if (auth.currentUser?.email !== null && auth.currentUser?.email !== undefined) {
            contributors.push(auth.currentUser?.email);
            const newData = {
              id: contributors.reverse(),
              courseNumber,
              courseTitle: title,
              details,
              password,
              tags,
              imageUrl: url,
            };

            this.createNewCourse(newData).then(() => {
              const { toast } = createStandaloneToast();
              toast({
                title: 'Cours créé avec succès.',
                description: 'Le cours a été créé avec succès, vous pouvez maintenant en modifier le contenu.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
              });
              this.setState({ isAdding: false });
            });
          }
        });
      }
    });
  };

  render() {
    const {
      activeSubmnit, contributors, courseNumber, title, details, password, tags, uri, isAdding,
    } = this.state;
    return (
      <Box paddingLeft="calc(15%)" paddingTop="calc(5%)">
        <VStack spacing="25px">
          <CourseCreationCard />
          <FormTitleCard inputCallback={this.globaleSetState} value={title} />
          <FormSigleCard inputCallback={this.globaleSetState} value={courseNumber} />
          <FormImageCard inputCallback={this.globaleSetState} value={uri} ref={this.imageCardRef} />
          <FormTagsCard inputCallback={this.globaleSetState} value={tags.toString()} />
          <FormDescriptionCard inputCallback={this.globaleSetState} value={details} />
          <FormVisibilityCard inputCallback={this.globaleSetState} value={password} />
          <FormContributorCard
            inputCallback={this.globaleSetState}
            value={contributors.toString()}
          />
          <Box height="150px" />
        </VStack>

        <Button position="fixed" bottom="30px" right="30px" size="lg" w="150px" colorScheme="blue" onClick={this.submitCourse} disabled={!activeSubmnit}>
          {isAdding ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : <Text>Ajouter</Text> }

        </Button>

      </Box>
    );
  }
}

export default CourseCreationForm;
