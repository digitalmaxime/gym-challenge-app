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
import { auth } from "../utils/firebase";
import { ProgressDictionary } from "../models/challengeProgress/ProgressDictionary";

type User = {
  userData: UserData;
  initUser: () => Promise<void>;
  reset: () => void;
  challengeProgresses: ProgressDictionary;
  SyncUserChallengeProgresses: () => void;
};

const UserContext = createContext({});

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<UserData>();
  const [challengeProgresses, setChallengeProgresses] =
    useState<ProgressDictionary>();

  async function initUser() {
    console.log("-- INIT USER ctx");
    try {
      console.log(auth.currentUser?.uid);
      const res = await Controller.getCurrentUser(); // TODO: erreur ici
      const fetchedUserData = res.data as UserData;

      console.log(fetchedUserData);

      if (
        fetchedUserData !== null &&
        fetchedUserData !== undefined &&
        Object.hasOwn(fetchedUserData, "email")
      ) {
        console.log("setUserData(fetchedUserData as UserData);");
        setUserData(fetchedUserData as UserData);
        await SyncUserChallengeProgresses();
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

  async function SyncUserChallengeProgresses() {
    try {
      const res = await Controller.getUserChallengeProgresses();

      const fetchedChallengeProgresses = res.data;
      // Object.entries(fetchedChallengeProgresses).forEach(record => { // TODO: figure out why shit ain't sorted..
      //   Object.entries(record[1]).forEach(challengeProgress => {
      //     challengeProgress[1].sort((a, b) => (a?.timestamp || 0) - (b?.timestamp || 0))
      //   })
      // })
      // fetchedChallengeProgresses
      // .PinchProgresses.wideDeep.sort(
      //   (a, b) => (a?.timestamp || 0) - (b?.timestamp || 0)
      // );
      setChallengeProgresses((_) => fetchedChallengeProgresses);
      console.log("challengeProgresses");
      console.log("challengeProgresses");
      console.log("challengeProgresses");
      console.log(challengeProgresses);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error({ message });
      console.warn(`failed at ${SyncUserChallengeProgresses.name}..`);
    }
  }

  function reset() {
    setUserData(undefined);
  }

  const value = useMemo(
    () => ({
      userData,
      challengeProgresses,
      SyncUserChallengeProgresses,
      initUser,
      reset,
    }),
    [userData, challengeProgresses]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext) as User;
