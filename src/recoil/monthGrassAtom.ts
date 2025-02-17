// src/recoil/grassAtom.ts
import {atom} from 'recoil';
import {GrassType} from '../api/monthGrass/getMonthGrassType';

const grassState = atom<GrassType[] | null>({
  key: 'grassState',
  default: null,
});

export default grassState;
