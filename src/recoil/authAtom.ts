import {atom} from 'recoil';

export interface AuthTypes {
  email: string;
  authToken: string;
}

const authState = atom<AuthTypes>({
  key: 'authState',
  default: {email: '', authToken: ''},
});

export default authState;
