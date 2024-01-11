import Question from './Question';

type Lesson = {
  id: string;

  name: string;

  questions: Question[];
};

export default Lesson;
