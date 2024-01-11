import Section from './section/Section';

type Course = {
  id: string;

  courseNumber: string;

  sections: Section[];
};

export default Course;
