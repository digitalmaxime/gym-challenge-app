import Section from './Section';

type Course = {

  id: string; // id généré par le push sur la db ex: uuid

  courseNumber: string; // sigle du cours limite 8

  courseTitle: string; // no limit

  details: string; // nolimit

  imageUrl: string;

  password: string; // 8 c saved plain

  savedSections: Section[];

  publishedSections: Section[];

  tags: string[]; // minimum 3 differents avec max 22

  contributors: string[] // array user id
};

export default Course;
