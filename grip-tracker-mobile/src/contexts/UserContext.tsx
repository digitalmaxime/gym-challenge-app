/* eslint-disable max-len */
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import UserData from '../models/user/UserData';

const UserContext = createContext({});
type AuthProps = {
  children: ReactNode;
};
export function UserProvider({ children }: AuthProps) {
  const [userData, setUserData] = useState<UserData>();

  async function initUser(userId: string) {
    console.log(`Init user : ${userId}`);
  }

  function reset() {
    setUserData(undefined);
  }

  const value = useMemo(
    () => ({
      initUser,
      reset,
    }),
    [userData],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);
