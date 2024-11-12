import {atom} from 'recoil';
import {SetterOrUpdater} from 'recoil';
export interface AuthTypes {
  email: string;
  authToken: string;
}

const authState = atom<AuthTypes>({
  key: 'authState',
  default: {email: '', authToken: ''},
});

let setAuthState: SetterOrUpdater<AuthTypes> | null = null;

export const setSetAuthState = (setter: SetterOrUpdater<AuthTypes>) => {
  setAuthState = setter;
};

export const updateAuthToken = (newAuthToken: string) => {
  if (setAuthState) {
    setAuthState(prevState => ({...prevState, authToken: newAuthToken}));
  }
};
export default authState;
