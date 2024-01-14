/* eslint-disable max-len */
import Lesson from './Lesson';

type Unit = {
  id: string; // concat

  name: string; // TODO: bloquer le length a environ 10 (StringOfLength)

  description: string; // used as description of the unit name

  hintUri: string; // url vers le firebase storage qui contient une page html pour render // verif fesabilite

  lessons: Lesson[];
};

export default Unit;
