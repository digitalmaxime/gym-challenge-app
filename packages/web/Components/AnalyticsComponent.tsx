/* eslint-disable class-methods-use-this */
import dynamic from 'next/dynamic';
import {
  VStack, Select, Box, HStack, Input, TableContainer,
  Tbody, Th, Thead, Tr, Td, Table, Button, Spinner, Text,
} from '@chakra-ui/react';
import React, { ChangeEvent, RefObject } from 'react';
import { httpsCallable } from 'firebase/functions';
import { ApexOptions } from 'apexcharts';
import router from 'next/router';
import Course from '../utils/Course';
import { auth, firebaseFunctionsEmulator } from '../pages/global';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

enum EventType {
  COURSE,
  CONTROLPOINT,
  LESSON,
  QUESTION,
  SECTION,
  UNIT
}

type EventAnalytics = {
useremail: string;
type: EventType;
objectId: string;
status: boolean;
timestamp: number;
};

interface UserGraphCountProps {
  categories: Date[],
  seriesData: [number, number][]
}

interface UserRepartitionProps {
  labels: string[],
  seriesData: number[]
}

interface CourseElementsAnalytics { name: string, id: string, type: EventType }

interface AnalyticsTableObject
{ parents: CourseElementsAnalytics [] ;}

interface AnalyticsComponentState {
  availableCourses : { name: string, id: string }[],
  currentCourse: Course,
  currentEvents: EventAnalytics[],
  dateFromFilter: Date,
  dateToFilter: Date,
  emailFilter: string,
  currentAnalyticsObject: CourseElementsAnalytics,
  isLoading: boolean,
}

// eslint-disable-next-line @typescript-eslint/ban-types
class AnalyticsComponent extends React.Component<{},
  AnalyticsComponentState> {
  getCourseAnalytics = httpsCallable(firebaseFunctionsEmulator, 'getCourseAnalytics');

  getCourses = httpsCallable(firebaseFunctionsEmulator, 'getAllCourses');

  getCourseData = httpsCallable(firebaseFunctionsEmulator, 'getCourseData');

  // eslint-disable-next-line @typescript-eslint/ban-types
  scrollRef: RefObject<unknown>;

  // need to update this in order to pass the firebase initialised object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,
  constructor(props: any) {
    super(props);
    this.state = {
      availableCourses: [],
      currentCourse: {
        id: '',
        contributors: [],
        courseNumber: '',
        courseTitle: '',
        details: '',
        imageUrl: '',
        password: '',
        savedSections: [],
        publishedSections: [],
        tags: [],
      },
      currentEvents: [],
      dateFromFilter: new Date('2022-01-11T00:00:00.000Z'),
      dateToFilter: new Date(Date.now()),
      emailFilter: '',
      currentAnalyticsObject: {
        type: EventType.COURSE,
        name: '',
        id: '',
      },
      isLoading: true,
    };

    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    this.initData();
  }

  scrollToRef = () => {
    const boxRef = this.scrollRef.current as HTMLElement;
    window.scrollTo(0, boxRef?.offsetTop);
  };

  getCurrentObjectData = (events: EventAnalytics[]) => {
    const { currentAnalyticsObject, currentCourse } = this.state;
    const tempData = new Map<string, {name: string, val: number, total: number}>();
    let numberUsersTried = 0;
    const graphDataSeries : number [] = [];
    const graphDataCategories : string [] = [];

    const users: string[] = [];
    if (currentCourse.publishedSections === null) {
      return {
        nbUsersCompeledCurrentAnalyticsObject: 0,
        controlPointSuccesRate: 0,
        graphDataCategories: [],
        graphDataSeries: [],
      };
    }
    if (currentAnalyticsObject.type === EventType.SECTION) {
      currentCourse.publishedSections.forEach((elem) => {
        if (elem.id === currentAnalyticsObject.id) {
          elem.units.forEach((unitToTrack) => {
            tempData.set(unitToTrack.id, { name: unitToTrack.name, val: 0, total: 0 });
          });
          if (elem.controlPoint) {
            tempData.set(elem.controlPoint.id, { name: elem.controlPoint.name, val: 0, total: 0 });
          }
        }
      });
    } else if (currentAnalyticsObject.type === EventType.UNIT) {
      currentCourse.publishedSections.forEach((elem) => {
        elem.units.forEach((unit) => {
          if (unit.id === currentAnalyticsObject.id) {
            unit.lessons.forEach((lesson) => {
              tempData.set(lesson.id, { name: lesson.name, val: 0, total: 0 });
            });
          }
        });
      });
    } else if (currentAnalyticsObject.type === EventType.CONTROLPOINT) {
      currentCourse.publishedSections.forEach((elem) => {
        if (elem.controlPoint && elem.controlPoint.id === currentAnalyticsObject.id) {
          elem.controlPoint.questions.forEach((quest) => {
            tempData.set(quest.id, { name: quest.name, val: 0, total: 0 });
          });
        }
      });
    } else if (currentAnalyticsObject.type === EventType.LESSON) {
      currentCourse.publishedSections.forEach((elem) => {
        elem.units.forEach((unit) => {
          unit.lessons.forEach((lesson) => {
            if (lesson.id === currentAnalyticsObject.id) {
              lesson.questions.forEach((quest) => {
                tempData.set(quest.id, { name: quest.name, val: 0, total: 0 });
              });
            }
          });
        });
      });
    }

    events.forEach((event) => {
      if (event.objectId === currentAnalyticsObject.id) {
        if (!users.includes(event.useremail) && event.status) { users.push(event.useremail); }
        numberUsersTried += 1;
      }
      const tuple = tempData.get(event.objectId);
      if (tuple !== undefined) {
        const newVal = event.status ? tuple.val + 1 : tuple.val;
        const newTot = tuple.total + 1;
        tempData.set(event.objectId, { name: tuple.name, val: newVal, total: newTot });
      }
    });

    const nbUsersCompeledCurrentAnalyticsObject = users.length;
    const controlPointSuccesRate = users.length / numberUsersTried;

    tempData.forEach((value) => {
      if (currentAnalyticsObject.type === EventType.CONTROLPOINT
         || currentAnalyticsObject.type === EventType.LESSON) {
        graphDataSeries.push(Number(((value.val / value.total) * 100).toFixed(2)));
      }
      graphDataCategories.push(value.name);
    });

    return {
      nbUsersCompeledCurrentAnalyticsObject,
      controlPointSuccesRate,
      graphDataCategories,
      graphDataSeries,
    };
  };

  getAnalyticsChartTitle = () => {
    const { currentAnalyticsObject } = this.state;
    switch (currentAnalyticsObject.type) {
      case EventType.CONTROLPOINT:
        return { title: 'Taux de réussite des questions', hint: 'Taux de réussite' };
      case EventType.LESSON:
        return { title: 'Taux de réussite des questions', hint: 'Taux de réussite' };
      case EventType.UNIT:
        return { title: 'Taux de complétion des lessons', hint: 'Taux de complétion' };
      case EventType.SECTION:
        return { title: 'Taux de complétion des unités', hint: 'Taux de complétion' };
      default:
        return { title: 'Aucun objet selectionné', hint: 'Taux de complétion' };
    }
  };

  getFilteredData = () => {
    const {
      currentEvents, dateFromFilter, dateToFilter, emailFilter,
    } = this.state;
    const returnArray: EventAnalytics[] = [];

    currentEvents.forEach((event) => {
      if (event.timestamp >= dateFromFilter.getTime()
      && event.timestamp <= dateToFilter.getTime()
      && event.useremail.includes(emailFilter)) {
        returnArray.push(event);
      }
    });

    return returnArray;
  };

  getUserGraphData = (events: EventAnalytics[]) => {
    const { dateFromFilter, dateToFilter } = this.state;
    const returnValue: UserGraphCountProps = { categories: [], seriesData: [] };
    const tempDict = new Map<number, number>();
    const dayIncrement = 24 * 60 * 60 * 1000;
    const startTime = Math.floor(dateFromFilter.getTime() / dayIncrement) * dayIncrement;
    const endTime = Math.floor(dateToFilter.getTime() / dayIncrement) * dayIncrement;
    let counter = 0;
    for (let i = startTime; i < endTime; i += dayIncrement) { tempDict.set(i, counter); }
    events.forEach((value) => {
      if (value.type === EventType.COURSE) {
        counter = value.status ? counter += 1 : counter -= 1;
        const index = Math.round(value.timestamp / dayIncrement) * dayIncrement;
        tempDict.set(index, counter);
      }
    });
    let previousVal = 0;
    tempDict.forEach((value, key) => {
      if (value !== previousVal && value !== 0) { previousVal = value; }
      returnValue.seriesData.push([key, previousVal]);
    });

    return returnValue;
  };

  getUserRepartitionData = (events: EventAnalytics[]) => {
    const returnValue: UserRepartitionProps = { labels: [], seriesData: [] };
    const tempDict = new Map<string, number>();

    events.forEach((value) => {
      if (value.type === EventType.COURSE) {
        const emailBase = value.useremail.split('@')[1];
        if (value.status) {
          if (tempDict.get(emailBase) === undefined) { tempDict.set(emailBase, 0); }
          const oldI = tempDict.get(emailBase);
          if (oldI !== undefined) { tempDict.set(emailBase, oldI + 1); }
        } else {
          if (tempDict.get(emailBase) === undefined) { tempDict.set(emailBase, 0); }
          const oldI = tempDict.get(emailBase);
          if (oldI !== undefined) { tempDict.set(emailBase, oldI - 1); }
        }
      }
    });

    tempDict.forEach((value, key) => {
      returnValue.labels.push(key);
      returnValue.seriesData.push(value);
    });
    return returnValue;
  };

  getCourseTableElements = () => {
    const { currentCourse } = this.state;
    const returnArray:AnalyticsTableObject [] = [];
    if (currentCourse.publishedSections === null) { return []; }
    currentCourse.publishedSections.forEach((section) => {
      if (section.controlPoint !== null) {
        returnArray.push({
          parents: [{ name: section.name, id: section.id, type: EventType.SECTION },
            {
              name: section.controlPoint.name,
              id: section.controlPoint.id,
              type: EventType.CONTROLPOINT,
            },
          ],
        });
      }
      section.units.forEach((unit) => {
        unit.lessons.forEach((lesson) => {
          returnArray.push({
            parents: [{ name: section.name, id: section.id, type: EventType.SECTION },
              { name: unit.name, id: unit.id, type: EventType.UNIT },
              { name: lesson.name, id: lesson.id, type: EventType.LESSON }],
          });
        });
      });
    });
    return returnArray;
  };

  initData = () => {
    this.getCourses({ email: auth.currentUser?.email }).then((result1) => {
      const courseArray = result1.data as {name:string, id:string}[];
      if (courseArray.length === 0) { this.setState({ isLoading: false }); return; }
      this.getCourseData({ id: courseArray[0].id }).then((courseResult) => {
        const currentCourse = courseResult.data as {course: Course, id:string};
        this.getCourseAnalytics({ courseId: courseArray[0].id }).then((analyticsResult) => {
          const test = analyticsResult.data as EventAnalytics[];
          test.sort((a, b) => a.timestamp - b.timestamp);
          this.setState({
            availableCourses: courseArray,
            currentCourse: currentCourse.course,
            currentEvents: test,
            isLoading: false,
          }, () => { this.scrollToRef(); });
        });
      });
    });
  };

  handleEmailFilterClick = (e:ChangeEvent<HTMLSelectElement>) => {
    this.setState({ emailFilter: e.target.value });
  };

  handleDateFromChange = (e:ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (e.target.value === '') { return; }
    this.setState({ dateFromFilter: new Date(newVal) });
  };

  handleDateToChange = (e:ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    this.setState({ dateToFilter: new Date(newVal) });
  };

  changeSelectedCourse = (e : ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    if (newValue !== null || newValue !== '') {
      this.getCourseData({ id: newValue }).then((courseResult) => {
        const currentCourse = courseResult.data as {course: Course, id:string};
        this.getCourseAnalytics({ courseId: currentCourse.id }).then((analyticsResult) => {
          const test = analyticsResult.data as EventAnalytics[];
          test.sort((a, b) => a.timestamp - b.timestamp);
          this.setState({
            currentCourse: currentCourse.course,
            currentEvents: test,
          }, () => { this.scrollToRef(); });
        });
      });
    }
  };

  changeSelectedAnalyticsObject = (e: CourseElementsAnalytics) => {
    this.setState({
      currentAnalyticsObject: e,
    });
  };

  render() {
    const {
      availableCourses, dateFromFilter, dateToFilter, isLoading,
    } = this.state;

    const chartTitle = this.getAnalyticsChartTitle();
    const filteredData = this.getFilteredData();
    const userGraphData = this.getUserGraphData(filteredData);
    const userRepartition = this.getUserRepartitionData(filteredData);
    const tableElements = this.getCourseTableElements();
    const currentAnalyticsData = this.getCurrentObjectData(filteredData);

    const userGraphOptions: ApexOptions = {

      xaxis: {
        // eslint-disable-next-line quotes
        type: "datetime",
        tickAmount: 1,
        // categories: userGraphData.categories,
        labels: {
          format: 'dd/MMMM',
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
      title: {
        text: "Nombre d'étudiants",
      },
    };
    const userGraphSeries = [
      {
        name: 'series-1',
        data: userGraphData.seriesData,
      },
    ];
    const options2: ApexOptions = {

      labels: userRepartition.labels,

      title: {
        text: 'Répartition des étudiants',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
    };
    const series2 = userRepartition.seriesData;
    const seriesArray = currentAnalyticsData.graphDataSeries.length > 0
      ? currentAnalyticsData.graphDataSeries : [5];
    const objS = [{
      name: chartTitle.hint,
      data: seriesArray,
      max: 100,
    },
    ];
    const objCateg = currentAnalyticsData.graphDataCategories.length > 0
      ? currentAnalyticsData.graphDataCategories : ['test'];
    const objOptions: ApexOptions = {
      title: {
        text: chartTitle.title,
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: objCateg,
      },
      yaxis: {
        title: {
          text: '% (pourcentage)',
        },
        max: 100,
      },
      fill: {
        opacity: 1,
      },
    };

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
      <Box paddingLeft="calc(15%)" paddingTop="calc(1%)" width="200%">
        <VStack alignItems="start" spacing="25px" width="100%" pl={20}>

          <Select width="40%" h="45px" fontSize="3xl" onChange={this.changeSelectedCourse}>
            { availableCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Select>

          <Text fontSize="2xl">Filtre sur les données analytiques</Text>
          <HStack width="100%">
            <HStack width="33%">
              <Text>Courriels</Text>
              <Select onChange={this.handleEmailFilterClick} width="40%">
                <option key={`option-${'None'}`} value=""> None </option>
                {userRepartition.labels.map((email) => (
                  <option key={`option-${email}`} value={email}>{email}</option>
                ))}

              </Select>
            </HStack>
            <HStack width="33%">
              <Text>Date de début</Text>
              <Input width="40%" placeholder="Date de début" size="md" type="date" value={dateFromFilter.toISOString().split('T')[0]} max={dateToFilter.toISOString().split('T')[0]} onChange={this.handleDateFromChange} />
            </HStack>
            <HStack width="33%">
              <Text>Date de fin</Text>
              <Input width="40%" placeholder="Date de fin" size="md" type="date" value={dateToFilter.toISOString().split('T')[0]} min={dateFromFilter.toISOString().split('T')[0]} onChange={this.handleDateToChange} />
            </HStack>
          </HStack>
          <Text fontSize="2xl">Affichage des données filtrées</Text>
          <HStack width="100%" spacing="5%">
            <Box padding="1%" />
            <Box backgroundColor="white">
              {(typeof window !== 'undefined')
                  && (
                    <Chart options={userGraphOptions} series={userGraphSeries} type="line" width="200%" />
                  )}
            </Box>
            <Box />
            <Box backgroundColor="white">
              {(typeof window !== 'undefined')
                  && (
                  <Chart options={options2} series={series2} type="pie" width="175%" />
                  )}
            </Box>
          </HStack>

          <HStack width="100%" alignContent="start">
            {tableElements.length > 0
              ? (
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Nom de section</Th>
                        <Th>Nom d&apos;unité / Point de controle</Th>
                        <Th>Nom de Lesson </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tableElements.map((elem) => (
                        <Tr key={`tableElem-${elem.parents[elem.parents.length - 1].id}`}>
                          {elem.parents.map((child) => (<Td color="blue.400" cursor="grab" onClick={() => { this.changeSelectedAnalyticsObject(child); }} key={`tableNameElem-${child.id}`}>{child.name}</Td>))}
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>

                </TableContainer>
              )
              : <Text m={8} fontSize="xl">Ce cours ne contient pas de contenu publié.</Text>}
            <Box padding="5.64%" />
            <VStack right="0">
              <Box backgroundColor="white">
                {(typeof window !== 'undefined')
                  && (
                    <Chart
                      options={objOptions}
                      series={objS}
                      type="bar"
                      width="400"
                      height="355"
                    />
                  )}
              </Box>
            </VStack>
          </HStack>

        </VStack>
      </Box>
    );
  }
}

export default AnalyticsComponent;
