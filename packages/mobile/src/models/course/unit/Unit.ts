import Lesson from '../lesson/Lesson';

type Unit = {
  id: string;
  name: string;
  description: string;
  hintUri: string;
  lessons: Lesson[];
};

export default Unit;
