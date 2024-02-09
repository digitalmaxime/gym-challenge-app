/* eslint-disable max-len */
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import * as Controller from "../api/controller";
import UserData from "../models/user/UserData";
import { GripTypeEnum } from "../models/grip/GripTypeEnum";

type User = {
  userData: UserData;
  initUser: (userId: string) => Promise<void>;
  reset: () => void;
  challengeProgresses: ChallengeProgressModel[];
  getUserChallengeProgresses: (userId: string) => void;
};

const UserContext = createContext({});
type AuthProps = {
  children: ReactNode;
};
export function UserProvider({ children }: AuthProps) {
  const [userData, setUserData] = useState<UserData>();
  const [challengeProgresses, setChallengeProgresses] = useState<
    Record<GripTypeEnum, ChallengeProgressModel[]>
  >();

  async function initUser(userId: string) {
    console.log("-- INIT USER");
    try {
      const res = await Controller.getUserById(userId);
      const fetchedUserData = res.data as UserData;
      console.log(fetchedUserData);

      if (
        fetchedUserData !== null &&
        fetchedUserData !== undefined &&
        Object.hasOwn(fetchedUserData, "id") &&
        Object.hasOwn(fetchedUserData, "email")
      ) {
        console.log("setUserData(fetchedUserData as UserData);");
        setUserData(fetchedUserData as UserData);
        getUserChallengeProgresses(fetchedUserData.id);
      } else {
        // TODO: set error
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error({ message });
      console.warn("initUser failed .. :(");
      throw new Error("l'initialisation des donnees a échoué");
    }
  }

  // TODO: think about inversify
  async function getUserChallengeProgresses(userId: string) {
    try {
      const res = await Controller.getUserChallengeProgresses(userId);
      const fetchedChallengeProgresses = res.data;
      console.log("-------------------------->");
      console.log(fetchedChallengeProgresses);
      console.log("<--------------------------");
      // TODO: classify pregresses by type
      // setChallengeProgresses(fetchedChallengeProgresses);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error({ message });
      console.warn(`failed at ${getUserChallengeProgresses.name}..`);
    }
  }

  function reset() {
    setUserData(undefined);
  }

  // TODO: think about memo when progress is updated
  const value = useMemo(
    () => ({
      userData,
      challengeProgresses,
      getUserChallengeProgresses,
      initUser,
      reset,
    }),
    [userData, challengeProgresses]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext) as User;
