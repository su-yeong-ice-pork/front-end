import {atom} from 'recoil';
import {OtherUserInformationType} from '../api/otherUsers/getOtherUsersTypes';

const otherUsersState = atom<OtherUserInformationType[]>({
  key: 'otherUsersState',
  default: [],
});

export default otherUsersState;
