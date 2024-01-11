import {
  VStack, Button, createStandaloneToast, Box, Text,
  TableContainer, Tbody, Th, Thead, Tr, Td, Table, HStack, Spinner,
} from '@chakra-ui/react';

import React from 'react';
import { httpsCallable } from 'firebase/functions';
import router from 'next/router';
import Link from 'next/link';
import { auth, firebaseFunctionsEmulator } from '../pages/global';
import Course from '../utils/Course';

interface CourseModificationState {
    availableCourses : {name: string, id:string, isArchived:boolean}[],
    availableCoursesData: Course[],
    isLoading: boolean,
}

class CourseArchive extends React.Component<Record<string, never>,
CourseModificationState> {
  getCourses = httpsCallable(firebaseFunctionsEmulator, 'getAllCourses');

  publishCourse = httpsCallable(firebaseFunctionsEmulator, 'publishCourse');

  getCourseData = httpsCallable(firebaseFunctionsEmulator, 'getCourseData');

  archiveCourse = httpsCallable(firebaseFunctionsEmulator, 'archiveCourse');

  deleteCourse = httpsCallable(firebaseFunctionsEmulator, 'deleteCourse');

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      availableCourses: [],
      availableCoursesData: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.initCourses();
  }

  doArchiveCourse = (courseId: string) => {
    this.archiveCourse({ courseId }).then(() => {
      const { toast } = createStandaloneToast();
      toast({
        title: 'Cours archivé avec succès.',
        description: 'Le cours a été archivé avec succès.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      this.initCourses();
    });
  };

  doDeleteCourse = (courseId: string) => {
    this.deleteCourse({ courseId }).then(() => {
      const { toast } = createStandaloneToast();
      toast({
        title: 'Cours supprimé avec succès.',
        description: 'Le cours a été supprimé avec succès.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      this.initCourses();
    });
  };

  doPublishCourse = (courseId: string) => {
    const { availableCoursesData } = this.state;
    const findCourse = (course: Course) => course.id === courseId;
    const currentCourse = availableCoursesData.find(findCourse);
    if (currentCourse === undefined) { return; }
    currentCourse.publishedSections = currentCourse.savedSections;
    this.publishCourse({
      courseId: currentCourse.id,
      course: currentCourse,
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
  };

  initCourses = () => {
    this.getCourses({ email: auth.currentUser?.email }).then((result) => {
      const { data } = result;
      const courseArray = data as {name:string, id:string}[];
      const courses: Course[] = [];
      const courseArrayWithBoolean : {name:string, id:string, isArchived:boolean}[] = [];
      let counterRequest = 0;

      if (courseArray.length === 0) { this.setState({ isLoading: false }); return; }
      courseArray.forEach((course) => {
        this.getCourseData({ id: course.id }).then((resultC) => {
          const courseData = resultC.data as {id:string, course: Course};
          if (courseData.course.publishedSections === null) {
            courseArrayWithBoolean.push({ id: course.id, name: course.name, isArchived: true });
          } else {
            courseArrayWithBoolean.push({ id: course.id, name: course.name, isArchived: false });
          }

          const thisCourse = courseData.course;
          thisCourse.id = courseData.id;
          courses.push(thisCourse);

          counterRequest += 1;
          if (counterRequest === courseArray.length) {
            this.setState({
              availableCourses: courseArrayWithBoolean,
              availableCoursesData: courses,
              isLoading: false,
            });
          }
        });
      });
    });
  };

  render() {
    const {
      availableCourses, isLoading,
    } = this.state;

    const CommonHeader = (
      <Box>
        <Text fontSize="4xl" textAlign="left">  Gestion de cours </Text>

        <Text fontSize="xl" textAlign="left">  Il exite deux états possibles pour chacun des cours: </Text>
        <HStack>
          <Text fontSize="xl" textAlign="left" fontWeight="semibold">   Publié :</Text>
          <Text fontSize="xl" textAlign="left">   Un cours publié est accessible par les étudiants à travers l&apos;application mobile.</Text>
        </HStack>
        <HStack>
          <Text fontSize="xl" textAlign="left" fontWeight="semibold">Archivé :</Text>
          <Text fontSize="xl" textAlign="left">
            Un cours archivé n&apos;est pas accessible par les
            étudiants mais vous pouvez en modifier le contenu via la
          </Text>
          <Link href="/modification">
            <Text fontSize="xl" style={{ color: 'blue', cursor: 'pointer' }}>
              page de modification de cours.
            </Text>

          </Link>
        </HStack>
        <Box padding="2%" />
      </Box>
    );
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
        <Box paddingLeft="calc(25%)" paddingTop="calc(5%)" w="100%">
          { CommonHeader }

          <Box>
            <HStack paddingRight="calc(20%)" justifyContent="center">
              <Text as="i"> Aucun cours disponible </Text>
              <Button onClick={() => { router.push('/cours'); }} style={{ color: 'blue', cursor: 'pointer' }}> Ajouter un cours </Button>
            </HStack>

          </Box>

        </Box>
      );
    }

    return (
      <Box paddingLeft="calc(25%)" paddingTop="calc(5%)" w="100%">
        {CommonHeader}
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nom du cours</Th>
                <Th>Statut du cours</Th>
                <Th>Action </Th>
              </Tr>
            </Thead>
            <Tbody>
              {
            availableCourses.map((course) => (
              <Tr key={course.id}>
                <Td>{course.name}</Td>
                { course.isArchived
                  ? <Td>Archivé</Td>
                  : <Td>Publié</Td>}
                <Td>
                  { course.isArchived
                    ? (
                      <HStack>
                        <Button onClick={() => this.doDeleteCourse(course.id)}> Supprimer </Button>
                        <Button onClick={() => this.doPublishCourse(course.id)}> Publier </Button>
                      </HStack>
                    )
                    : <Button onClick={() => this.doArchiveCourse(course.id)}> Archiver </Button>}

                </Td>
              </Tr>
            ))
        }
            </Tbody>
          </Table>

        </TableContainer>
        <VStack alignItems="start" spacing="25px" />
      </Box>
    );
  }
}

export default CourseArchive;
