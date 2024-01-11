import ControlPoint from '../controlPoint/ControlPoint';
import Unit from '../unit/Unit';

type Section = {
  id: string;
  name: string;
  units: Unit[];
  controlPoint: ControlPoint | undefined | null;
};

export default Section;
