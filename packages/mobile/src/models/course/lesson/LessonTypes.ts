export type PossibleAnswer = {
  uniqueID: string; // used for FlatList
  possibleAnswer: string;
};

export type PressedAnswer = {
  uniqueID: string; // used for FlatList
  pressedAnswer: string;
};

export type BrokenSentence = {
  uniqueID: string; // used for FlatList
  brokenSentence: string;
};

export type HoleAnswer = {
  uniqueID: string; // used for FlatList
  index: number;
  currentAnswer: string;
  hiddenCorrectAnswer: string;
};
