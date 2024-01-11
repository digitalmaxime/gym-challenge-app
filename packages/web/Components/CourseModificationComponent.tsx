import {
  VStack, Button, Select, createStandaloneToast, Box, HStack, Spinner, Text,
} from '@chakra-ui/react';
import React, { ChangeEvent, RefObject } from 'react';
import { httpsCallable } from 'firebase/functions';
import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import router from 'next/router';
import Course from '../utils/Course';
import CourseGeneralInformation from './CourseModificationComponents/CourseGeneralInfoComponent';
import {
  auth, firebaseFunctionsEmulator, firestoreEmulator,
} from '../pages/global';
import Section from '../utils/Section';
import CourseContentManager from './CourseModificationComponents/CourseContentManager';

export interface GeneralContent {
  id: string,
  courseNumber: string,
  courseTitle: string,
  details: string,
  imageUrl: string,
  password: string,
  tags: string[],
  contributors: string[],
}

export interface SectionsContent {
  savedSections: Section[],
  publishedSections: Section[],
}

interface CourseModificationState {
    availableCourses : {name: string, id:string}[],
    generalContent: GeneralContent,
    sectionsContent: SectionsContent,
    activeSave: number,
    activePublish: number,
    isLoading: boolean,
    isDoneLoading: boolean,
}

class CourseModificationForm extends React.Component<Record<string, never>,
CourseModificationState> {
  getCourses = httpsCallable(firebaseFunctionsEmulator, 'getAllCourses');

  getCourseData = httpsCallable(firebaseFunctionsEmulator, 'getCourseData');

  saveCourse = httpsCallable(firebaseFunctionsEmulator, 'updateCourse');

  publishCourse = httpsCallable(firebaseFunctionsEmulator, 'publishCourse');

  generalRef: RefObject<CourseGeneralInformation>;

  contentRef: RefObject<CourseContentManager>;

  scrollRef: RefObject<unknown>;

  unsubCourseModif: Unsubscribe | null;

  isSettingListener: boolean;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      availableCourses: [],
      generalContent: {
        id: '',
        contributors: [],
        courseNumber: '',
        courseTitle: '',
        details: '',
        imageUrl: '',
        password: '',
        tags: [],
      },
      sectionsContent: {

        savedSections: [],
        publishedSections: [],

      },
      activePublish: -1,
      activeSave: -1,
      isLoading: true,
      isDoneLoading: false,
    };
    this.generalRef = React.createRef<CourseGeneralInformation>();
    this.contentRef = React.createRef<CourseContentManager>();
    this.unsubCourseModif = null;
    // eslint-disable-next-line @typescript-eslint/ban-types
    this.scrollRef = React.createRef();
    this.isSettingListener = false;
  }

  componentDidMount() {
    this.initCourses();
  }

  componentWillUnmount(): void {
    if (this.unsubCourseModif !== null) { this.unsubCourseModif(); this.unsubCourseModif = null; }
    this.isSettingListener = false;
    this.setState({ isDoneLoading: false });
  }

  scrollToRef = () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const boxRef = this.scrollRef.current as HTMLElement;
    window.scrollTo(0, boxRef?.offsetTop);
  };

  doPublishCourse = () => {
    if (this.unsubCourseModif !== null) { this.unsubCourseModif(); this.unsubCourseModif = null; }
    this.setState({ activePublish: 2, isDoneLoading: false }, () => {
      const generalContent: GeneralContent | undefined = this.generalRef.current?.getState();
      const sectionsContent: SectionsContent | undefined = this.contentRef.current?.getState();
      if (generalContent !== undefined && sectionsContent !== undefined) {
        const course:Course = {
          contributors: generalContent.contributors,
          courseNumber: generalContent.courseNumber,
          courseTitle: generalContent.courseTitle,
          details: generalContent.details,
          id: generalContent.id,
          imageUrl: generalContent.imageUrl,
          password: generalContent.password,
          publishedSections: sectionsContent.publishedSections,
          savedSections: sectionsContent.savedSections,
          tags: generalContent.tags,
        };
        this.publishCourse({
          course, courseId: course.id,
        }).then(() => {
          const { toast } = createStandaloneToast();
          toast({
            title: 'Cours modifié avec succès.',
            description: 'Le cours a été modifié avec succès.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
          this.initCourses();
        });
      }
    });
  };

  doSaveCourse = () => {
    if (this.unsubCourseModif !== null) { this.unsubCourseModif(); this.unsubCourseModif = null; }
    this.setState({ activeSave: 2, isDoneLoading: false }, () => {
      const generalContent: GeneralContent | undefined = this.generalRef.current?.getState();
      const sectionsContent: SectionsContent | undefined = this.contentRef.current?.getState();

      if (generalContent !== undefined && sectionsContent !== undefined) {
        const newCourse: Course = {
          id: generalContent.id,
          courseNumber: generalContent.courseNumber,
          courseTitle: generalContent.courseTitle,
          details: generalContent.details,
          imageUrl: generalContent.imageUrl,
          password: generalContent.password,
          publishedSections: sectionsContent.publishedSections,
          tags: generalContent.tags,
          contributors: generalContent.contributors,
          savedSections: sectionsContent.savedSections,
        };

        this.saveCourse({ currentCourse: newCourse }).then(() => {
          const { toast } = createStandaloneToast();
          toast({
            title: 'Cours modifié avec succès.',
            description: 'Le cours a été modifié avec succès.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
          this.initCourses();
        });
      }
    });
  };

  initCourses = () => {
    this.getCourses({ email: auth.currentUser?.email }).then((result) => {
      const { data } = result;
      const courseArray = data as {name:string, id:string}[];
      if (courseArray.length === 0) { this.setState({ isLoading: false }); return; }
      this.getCourseData({ id: courseArray[0].id }).then((courseResult) => {
        const currentCourse = courseResult.data as {course: Course, id:string};
        const generalContent: GeneralContent = {
          id: currentCourse.id,
          courseNumber: currentCourse.course.courseNumber,
          courseTitle: currentCourse.course.courseTitle,
          details: currentCourse.course.details,
          imageUrl: currentCourse.course.imageUrl,
          password: currentCourse.course.password,
          tags: currentCourse.course.tags,
          contributors: currentCourse.course.contributors,
        };
        const sectionsContent: SectionsContent = {
          savedSections: currentCourse.course.savedSections,
          publishedSections: currentCourse.course.publishedSections,
        };

        if (this.unsubCourseModif === null && !this.isSettingListener) {
          this.isSettingListener = false;
          const onSnapchotChange = () => {
            const { isDoneLoading } = this.state;
            if (isDoneLoading) {
              this.setState({ activePublish: -1, activeSave: -1 });
              const { toast } = createStandaloneToast();
              toast({
                title: 'Un autre utilisateur modifie ce cours.',
                description: "Afin d'avoir les nouvelles données mise à jours, la page va se recharger.",
                status: 'warning',
                duration: 5000,
                isClosable: false,
                position: 'top',
                onCloseComplete: () => {
                  if (this.unsubCourseModif !== null) { this.unsubCourseModif(); }
                  this.unsubCourseModif = null;
                  router.push('/cours').then(() => { router.push('/modification'); });
                },
              });
            } else {
              this.setState({ isDoneLoading: true });
            }
          };
          const p = new Promise((resolve) => { setTimeout(() => { resolve(true); }, 1000); });
          p.then(() => {
            this.unsubCourseModif = onSnapshot(doc(firestoreEmulator, 'Courses', courseArray[0].id), onSnapchotChange);
          });
        }

        this.setState({
          availableCourses: courseArray,
          generalContent,
          sectionsContent,
          activePublish: 1,
          activeSave: 1,
          isLoading: false,
        }, () => { this.scrollToRef(); });
      });
    });
  };

  changeSelectedCourse = (e : ChangeEvent<HTMLSelectElement>) => {
    if (this.unsubCourseModif !== null) { this.unsubCourseModif(); this.unsubCourseModif = null; }
    this.setState({ isDoneLoading: false }, () => {
      this.isSettingListener = false;
      const newValue = e.target.value;
      const { availableCourses } = this.state;
      const courseIndexFinder = (course: {name: string, id: string}) => course.name === newValue;
      const newI = availableCourses.findIndex(courseIndexFinder);
      if (newI !== -1) {
        const newCourse = availableCourses[newI];
        this.doGetCourseData(newCourse.id);
        if (this.unsubCourseModif === null && !this.isSettingListener) {
          this.isSettingListener = false;
          const onSnapchotChange = () => {
            const { isDoneLoading } = this.state;
            if (isDoneLoading) {
              this.setState({ activePublish: -1, activeSave: -1 });
              const { toast } = createStandaloneToast();
              toast({
                title: 'Un autre utilisateur modifie ce cours.',
                description: "Afin d'avoir les nouvelles données mise à jours, la page va se recharger.",
                status: 'warning',
                duration: 5000,
                isClosable: false,
                position: 'top',
                onCloseComplete: () => {
                  if (this.unsubCourseModif !== null) { this.unsubCourseModif(); }
                  this.unsubCourseModif = null;
                  router.push('/cours').then(() => { router.push('/modification'); });
                },
              });
            } else {
              this.setState({ isDoneLoading: true });
            }
          };
          const p = new Promise((resolve) => { setTimeout(() => { resolve(true); }, 1000); });
          p.then(() => {
            this.unsubCourseModif = onSnapshot(doc(firestoreEmulator, 'Courses', newCourse.id), onSnapchotChange);
          });
        }
      }
    });
  };

  doGetCourseData(courseId: string) {
    this.getCourseData({ id: courseId }).then((courseResult) => {
      const currentCourse = courseResult.data as {course: Course, id:string};
      const generalContent: GeneralContent = {
        id: currentCourse.id,
        courseNumber: currentCourse.course.courseNumber,
        courseTitle: currentCourse.course.courseTitle,
        details: currentCourse.course.details,
        imageUrl: currentCourse.course.imageUrl,
        password: currentCourse.course.password,
        tags: currentCourse.course.tags,
        contributors: currentCourse.course.contributors,
      };
      const sectionsContent: SectionsContent = {
        savedSections: currentCourse.course.savedSections,
        publishedSections: currentCourse.course.publishedSections,
      };
      this.setState({

        generalContent,
        sectionsContent,
        activePublish: 1,
        activeSave: 1,
      }, () => { this.scrollToRef(); });
    });
  }

  changeActiveButtons(visible:boolean) {
    if (visible) {
      this.setState({ activePublish: 1, activeSave: 1 });
    } else {
      this.setState({ activePublish: -1, activeSave: -1 });
    }
  }

  render() {
    const {
      activeSave, activePublish, generalContent, availableCourses, sectionsContent, isLoading,
    } = this.state;

    if (isLoading) {
      return (
        <Box
          paddingLeft="calc(15%)"
          paddingTop="calc(5%)"
          w="100%"
        >

          <HStack justifyContent="center">

            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Text as="em"> Chargement en cours</Text>

          </HStack>

        </Box>
      );
    }

    if (availableCourses.length < 1) {
      return (
        <Box width="100%" paddingTop="calc(20%)" paddingLeft="calc(10%)">
          <HStack justifyContent="center">
            <Text as="i"> Aucun cours disponible </Text>
            <Button onClick={() => { router.push('/cours'); }} style={{ color: 'blue', cursor: 'pointer' }}> Ajouter un cours </Button>
          </HStack>
        </Box>
      );
    }

    return (
      <Box paddingLeft="calc(25%)" paddingTop="calc(5%)" w="100%">
        <VStack alignItems="start" spacing="25px">

          <Select w="40%" h="45px" fontSize="30px" onChange={(e) => { this.changeSelectedCourse(e); }}>
            { availableCourses.map((course) => (
              <option key={course.id + course.name} value={course.name}>
                {course.name}
              </option>
            ))}
          </Select>
          <CourseGeneralInformation
            ref={this.generalRef}
            generalContent={generalContent}
            allFieldValidTrigger={this.changeActiveButtons}
          />
          <CourseContentManager
            ref={this.contentRef}
            sectionsContent={sectionsContent}
            allFieldValidTrigger={this.changeActiveButtons}
          />

        </VStack>
        <Button position="fixed" bottom="90px" right="30px" size="lg" w="150px" colorScheme="blue" onClick={this.doSaveCourse} disabled={activeSave === -1}>
          {activeSave === 2 ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          ) : <Text>Sauvegarder</Text> }
        </Button>
        <Button position="fixed" bottom="30px" right="30px" size="lg" w="150px" colorScheme="blue" onClick={this.doPublishCourse} disabled={activePublish === -1}>
          {activePublish === 2 ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          ) : <Text>Publier</Text> }

        </Button>
      </Box>
    );
  }
}

export default CourseModificationForm;
