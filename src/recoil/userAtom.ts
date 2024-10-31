import {atom} from 'recoil';
import {Member} from '../api/profile';

const userState = atom<Member>({
  key: 'userState',
  default: {id: 0, name: '', mainTitle: '', profileImage: null, freezeCount: 0},
});

export default userState;
