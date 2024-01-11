import Question from './question/Question';

type ControlPoint = {
  id: string;

  name: string;

  questions: Question[];
}

export default ControlPoint;
