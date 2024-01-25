interface Challenge {
  userId: string;
  challengeId: string;
  duration: number;
  weight: number;
  timestamp: Date;
  comment: string;
}

export default Challenge;
