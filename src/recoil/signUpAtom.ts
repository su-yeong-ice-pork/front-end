import {atom} from 'recoil';
import {SignUp} from '../api/signUp/types';

const signUpState = atom<SignUp>({
  key: 'signUpState',
  default: {
    email: '',
    emailVerified: false,
    college: '',
    department: '',
    password: '',
    name: '',
    nickNameVerified: false,
  },
});

export default signUpState;
