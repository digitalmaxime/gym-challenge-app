/* eslint-disable max-len */
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import * as Controller from '../controller/controller';
import CourseProgress from '../models/progress/CourseProgress';
import UserData from '../models/user/UserData';

const UserContext = createContext({});

type AuthProps = {
  children: ReactNode;
};

type User = {
  userData: UserData;
  currentCourseProgress: CourseProgress | undefined;
  initUser: (userId: string) => Promise<void>;
  reset: () => void;
  setCourseProgress: (courseId: string) => Promise<void>;
  setCurrentCourseProgress: (courseProgress: CourseProgress | undefined) => Promise<void>;
};

export function UserProvider({ children }: AuthProps) {
  const [currentCourseProgress, setCurrentCourseProgress] = useState<CourseProgress>();
  const [userData, setUserData] = useState<UserData>();

  async function initUser(userId: string) {
    try {
      const res = await Controller.getUserById(userId);
      const fetchedUserData = res.data;
      if (fetchedUserData !== null && fetchedUserData !== undefined && 'id' in fetchedUserData && 'email' in fetchedUserData) {
        setUserData(fetchedUserData as UserData);
      }
    } catch (error) {
      const message = (error instanceof Error) ? error.message : String(error);
      console.error({ message });
      console.warn('initUser failed .. :(');
      throw new Error('l\'initialisation des donnees a échoué');
    }
  }

  async function setCourseProgress(courseId: string) {
    if (!userData?.id) { return; }

    try {
      const res = await Controller.getUserCourseProgress(userData?.id, courseId);
      const fetchedCurrentCourseProgress = res.data;
      if (
        fetchedCurrentCourseProgress
        && 'userId' in fetchedCurrentCourseProgress
        && 'courseId' in fetchedCurrentCourseProgress
        && 'userScore' in fetchedCurrentCourseProgress
        && 'progress' in fetchedCurrentCourseProgress) {
        setCurrentCourseProgress(fetchedCurrentCourseProgress as CourseProgress);
      } else {
        console.log(console.warn('could not set CurrentCourseProgress, fetched Progress is not of type CourseProgress..'));
      }
    } catch (error) {
      const message = (error instanceof Error) ? error.message : String(error);
      console.error({ message });
      console.warn('failed to setCourseProgress..');
    }
  }

  function reset() {
    setUserData(undefined);
    setCurrentCourseProgress(undefined);
  }

  const value = useMemo(
    () => ({
      userData,
      currentCourseProgress,
      initUser,
      reset,
      setCourseProgress,
      setCurrentCourseProgress,
    }),
    [currentCourseProgress, userData],
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext) as User;
