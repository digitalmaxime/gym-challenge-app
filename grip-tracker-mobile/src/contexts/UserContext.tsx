/* eslint-disable max-len */
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import * as Controller from '../controller/controller';
import UserData from '../models/user/UserData';

type User = {
  userData: UserData;
  initUser: (userId: string) => Promise<void>;
  reset: () => void;
};

const UserContext = createContext({});
type AuthProps = {
  children: ReactNode;
};
export function UserProvider({ children }: AuthProps) {
  const [userData, setUserData] = useState<UserData>();

  async function initUser(userId: string) {
    try {
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      console.log(userId);
      const res = await Controller.getUserById(userId);
      const fetchedUserData = res.data;

      console.log(fetchedUserData);
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      if (
        fetchedUserData !== null &&
        fetchedUserData !== undefined &&
        Object.hasOwn(fetchedUserData, 'id') &&
        Object.hasOwn(fetchedUserData, 'email')
      ) {
        setUserData(fetchedUserData as UserData);
      } else {
        // TODO: set error
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error({ message });
      console.warn('initUser failed .. :(');
      throw new Error("l'initialisation des donnees a échoué");
    }
  }

  function reset() {
    setUserData(undefined);
  }

  const value = useMemo(
    () => ({
      userData,
      initUser,
      reset,
    }),
    [userData],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext) as User;
