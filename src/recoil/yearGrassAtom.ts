import {atom} from 'recoil';
import {GrassType} from '../api/yearGrass/getYearGrassType';

const yearGrassState = atom<GrassType[] | null>({
  key: 'yearGrassState',
  default: null,
});

export default yearGrassState;
