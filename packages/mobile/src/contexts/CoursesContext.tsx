/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FirebaseError } from 'firebase/app';
import { useToast } from 'react-native-toast-notifications';
import { useUserContext } from './UserContext';
import { cacheImageUri } from '../utils/caching';
import Course from '../models/course/Course';
import CoursePreview from '../models/course/CoursePreview';
import * as Controller from '../controller/controller';
import Question from '../models/course/question/Question';
import { FunctionsErrorCode } from '../utils/firebase';

const CoursesContext = createContext({});

type Courses = {
  currentCourse: Course;
  followedCoursesPreview: CoursePreview[];
  allCoursesPreview: CoursePreview[];
  selectCourse: (courseId: string) => Promise<void>;
  fetchAllCoursesPreview: () => Promise<void>;
  addCourseToFollowedCourses: (coursePreview: CoursePreview) => void;
  removeCourseFromFollowedCourses: (courseId: string) => void;
  findQuestionInCurrentCourse: (questionId: string) => Question | undefined;
  courseReady: boolean;
  reset: () => void;
};

type AuthProps = {
  children: ReactNode;
};

export function CoursesProvider({ children }: AuthProps) {
  const userContext = useUserContext();
  const toast = useToast();

  const [currentCourse, setCurrentCourse] = useState<Course | undefined>();
  const [followedCoursesPreview, setFollowedCoursesPreview] = useState<CoursePreview[] | undefined>();
  const [allCoursesPreview, setAllCoursesPreview] = useState<CoursePreview[] | undefined>();
  const [courseReady, setCourseReady] = useState<boolean>(false);

  /* Once 'allCoursesPreview' is fetched, filter user's followed courses and set them */
  useEffect(() => {
    if (!allCoursesPreview) {
      setCourseReady(false);
      return;
    }
    const initCourse = async () => {
      await initFollowedCoursesPreview();
      allCoursesPreview?.slice(0, 10).forEach(async c => {
        await cacheImageUri(c.imageUrl);
      });
      setCourseReady(true);
    };

    initCourse();
  }, [allCoursesPreview]);

  async function selectCourse(selectedCourseId: string) {
    try {
      const res = await Controller.getCourseById(selectedCourseId);
      const newCurrentCourse = res.data as Course;
      if ('id' in newCurrentCourse && 'courseNumber' in newCurrentCourse && 'sections' in newCurrentCourse) {
        setCurrentCourse(newCurrentCourse);
        await userContext.setCourseProgress(selectedCourseId);
      } else {
        console.warn('setCurrentCourse and setCourseProgress failed, newCurrenCourse not of type Course..');
      }

      /** Make the selected course appear first in the list of followed courses */
      setFollowedCoursesPreview(prev =>
        prev?.sort((c: CoursePreview, _) => {
          if (c?.id === selectedCourseId) {
            return -1;
          }
          return 1;
        }));
    } catch (error) {
      const statusCodeUnavailable: FunctionsErrorCode = 'unavailable';
      const statusNotFound: FunctionsErrorCode = 'not-found';
      if (error instanceof FirebaseError && (error.code.includes(statusCodeUnavailable) || error.code.includes(statusNotFound))) {
        toast.show('Le cours n\'est plus disponible', {
          type: 'warning',
          placement: 'top',
          duration: 3000,
          animationType: 'zoom-in',
          swipeEnabled: true,
        });

        removeCourseFromFollowedCourses(selectedCourseId);
      }
      console.warn('failed to selectCourse..');
      const message = (error instanceof Error) ? error.message : String(error);
      console.error({ message });
    }
  }

  function addCourseToFollowedCourses(newCoursePreview: CoursePreview) {
    if (!newCoursePreview) {
      return;
    }

    const alreadyInFollowedCourses = followedCoursesPreview?.find(
      c => c.id === newCoursePreview.id,
    );
    if (!alreadyInFollowedCourses) {
      setFollowedCoursesPreview(current => [...current || [], newCoursePreview]);
    }
  }

  function removeCourseFromFollowedCourses(courseId: string) {
    setFollowedCoursesPreview(current =>
      current?.filter(c => c.id !== courseId));
    if (currentCourse?.id === courseId) {
      setCurrentCourse(undefined);
      userContext.setCurrentCourseProgress(undefined);
    }
    Controller.removeCourseFromFollowedCourses(
      userContext.userData?.id,
      courseId,
    ).then()
      .catch((err) => console.warn(err));
  }

  async function initFollowedCoursesPreview() {
    if (!userContext.userData || !userContext.userData.id) {
      return;
    }
    try {
      const res = await Controller.getUserFollowedCoursesIds(userContext.userData?.id);
      const followedCoursesIds = res.data as string[];
      if (followedCoursesIds instanceof Array) {
        const filteredFollowedCourses = allCoursesPreview?.filter(cp => followedCoursesIds.includes(cp?.id));
        setFollowedCoursesPreview(filteredFollowedCourses || []);
        if (filteredFollowedCourses && filteredFollowedCourses?.length > 0) {
          selectCourse(followedCoursesIds[0]); // TODO: this is arbitrary, should depend on timestamp or cache
        }
      } else {
        setFollowedCoursesPreview([]);
      }
    } catch (error) {
      const message = (error instanceof Error) ? error.message : String(error);
      console.error({ message });
      console.warn('failed to initFollowedCoursesPreview..');
    }
  }

  async function fetchAllCoursesPreview() {
    try {
      const res = await Controller.getAllCoursesPreview();
      const fetchedAllCoursesPreview = res.data as CoursePreview[];
      if (fetchedAllCoursesPreview instanceof Array) {
        setAllCoursesPreview(fetchedAllCoursesPreview);
      } else {
        console.warn('failed to assign fetchAllCoursesPreview, not an Array..');
      }
    } catch (error) {
      const message = (error instanceof Error) ? error.message : String(error);
      console.error({ message });
      console.warn('failed to fetchAllCoursesPreview..');
      setAllCoursesPreview([]);
    }
  }

  function findQuestionInCurrentCourse(questionId: string) {
    if (!currentCourse?.sections) {
      console.warn('!currentCourse?.sections undefined... questionId: ', questionId);
      return undefined;
    }

    let failedQuestion;
    currentCourse.sections.forEach(section => {
      section.units.forEach(unit => {
        unit.lessons.forEach(lesson => {
          lesson.questions.forEach(question => {
            if (question.id === questionId) {
              failedQuestion = question;
            }
          });
        });
      });
    });
    return failedQuestion;
  }

  function reset() {
    setCourseReady(false);
    setAllCoursesPreview(undefined);
    setFollowedCoursesPreview(undefined);
    setCurrentCourse(undefined);
  }

  const value = useMemo(
    () => ({
      currentCourse,
      followedCoursesPreview,
      allCoursesPreview,
      selectCourse,
      fetchAllCoursesPreview,
      addCourseToFollowedCourses,
      removeCourseFromFollowedCourses,
      findQuestionInCurrentCourse,
      courseReady,
      reset,
    }),
    [currentCourse, followedCoursesPreview, allCoursesPreview, findQuestionInCurrentCourse, courseReady],
  );

  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
}

export const useCoursesContext = () => useContext(CoursesContext) as Courses;
