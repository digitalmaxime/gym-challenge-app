import * as React from "react";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { ChallengeModel } from "../models/challenge/ChallengeModel";
import * as Controller from "../api/controller";
import { GripModel } from "../models/grip/GripModel";
import { GripDictionary } from "../models/grip/GripDictionary";
import { GripTypeEnum } from "../models/grip/GripTypeEnum";
import { ChallengeDictionary } from "../models/challenge/ChallengeDictionary";

type Challenges = {
  init: () => Promise<void>;
  allChallenges: ChallengeModel[];
  challengeDictionary: ChallengeDictionary;
  allGrips: GripModel[];
  gripDictionary: GripDictionary;
};

const ChallengeContext = createContext({});

interface ChallengeContextProps {
  children: ReactNode;
}

export function ChallengeProvider({ children }: ChallengeContextProps) {
  const [allChallenges, setAllChallenges] = useState<ChallengeModel[]>([]);
  const [challengeDictionary, setChallengeDictionary] =
    useState<ChallengeDictionary>();
  const [allGrips, setAllGrips] = useState<GripModel[]>([]);
  const [gripDictionary, setGripDictionary] = useState<GripDictionary>();

  async function init() {
    console.log("-- INIT Challenges ctx");
    const fetchedChallenges = (await Controller.getAllChallenges()).data;
    setAllChallenges((_) => fetchedChallenges);

    const fetchedGrips = (await Controller.getAllGrips()).data;
    setAllGrips((_) => fetchedGrips);

    const gripDict: GripDictionary = {
      [GripTypeEnum.Pinch]: fetchedGrips.filter(
        (g) => g.gripType === GripTypeEnum.Pinch
      ),
      [GripTypeEnum.Deadhang]: fetchedGrips.filter(
        (g) => g.gripType === GripTypeEnum.Deadhang
      ),
      [GripTypeEnum.Crimp]: fetchedGrips.filter(
        (g) => g.gripType === GripTypeEnum.Crimp
      ),
    };

    setGripDictionary((_) => gripDict);

    const challengeDict: ChallengeDictionary = {
      [GripTypeEnum.Pinch]: fetchedChallenges.filter((challenge) =>
        gripDict.pinch.map((grip) => grip.id).includes(challenge.gripId)
      ),
      [GripTypeEnum.Deadhang]: fetchedChallenges.filter((challenge) =>
        gripDict.deadhang.map((grip) => grip.id).includes(challenge.gripId)
      ),
      [GripTypeEnum.Crimp]: fetchedChallenges.filter((challenge) =>
        gripDict.crimp.map((grip) => grip.id).includes(challenge.gripId)
      ),
    };

    setChallengeDictionary((_) => challengeDict);
  }

  const value = useMemo(
    () => ({
      init,
      allChallenges,
      allGrips,
      gripDictionary,
      challengeDictionary,
    }),
    [allChallenges, allGrips, gripDictionary, challengeDictionary]
  );
  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
}

export const useChallengeContext = () =>
  useContext(ChallengeContext) as Challenges;
