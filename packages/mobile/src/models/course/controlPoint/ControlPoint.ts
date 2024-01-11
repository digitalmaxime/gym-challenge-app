import Question from '../question/Question';

type ControlPoint = {
  id: string;

  name: string;

  isCompleted: boolean;

  questions: Question[];
};

export default ControlPoint;
