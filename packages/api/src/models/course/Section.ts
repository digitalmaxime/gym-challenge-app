/* eslint-disable max-len */
import ControlPoint from './ControlPoint';
import Unit from './Unit';

type Section = {
  id: string; // id généré par le push sur la db ex: uuid concaténation courseId+SectionId
  name: string; // 17 c
  units: Unit[];
  controlPoint: ControlPoint | null;
}

export default Section;
