interface ChallengeModel {
  id: string;
  name: string;
  gripId: string;
  weight?: number;
  duration?: number;
  imgUri?: string;
}

export default ChallengeModel;
