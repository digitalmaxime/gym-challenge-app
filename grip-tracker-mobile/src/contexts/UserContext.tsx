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
import { auth } from "../utils/firebase";
import { ProgressDictionary } from "../models/challengeProgress/progressDictionary";

type User = {
  userData: UserData;
  initUser: () => Promise<void>;
  reset: () => void;
  challengeProgresses: ProgressDictionary;
  getUserChallengeProgresses: () => void;
};

const UserContext = createContext({});
type AuthProps = {
  children: ReactNode;
};
export function UserProvider({ children }: AuthProps) {
  const [userData, setUserData] = useState<UserData>();
  const [challengeProgresses, setChallengeProgresses] = useState<ProgressDictionary>();

  async function initUser() {
    console.log("-- INIT USER");
    try {
      console.log(auth.currentUser?.uid);
      const res = await Controller.getCurrentUser();
      const fetchedUserData = res.data as UserData;
      console.log(fetchedUserData);

      if (
        fetchedUserData !== null &&
        fetchedUserData !== undefined &&
        Object.hasOwn(fetchedUserData, "email")
      ) {
        console.log("setUserData(fetchedUserData as UserData);");
        setUserData(fetchedUserData as UserData);
        getUserChallengeProgresses();
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
  async function getUserChallengeProgresses() {
    try {
      const res = await Controller.getUserChallengeProgresses();
      const fetchedChallengeProgresses = res.data;
      setChallengeProgresses(fetchedChallengeProgresses);
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
