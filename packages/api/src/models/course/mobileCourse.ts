import Section from './Section';

type MobileCourse = {

  id: string; // id généré par le push sur la db ex: uuid

  courseNumber: string; // sigle du cours limite 8

  sections: Section[];
};

export default MobileCourse;
