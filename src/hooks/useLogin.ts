import {useMutation} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {useSetRecoilState} from 'recoil';
import authState from '@/src/recoil/authAtom';
import handleLogin from '@/src/api/login/LoginApi';

export const useLogin = (setIsLoading: (loading: boolean) => void) => {
  const navigation = useNavigation();
  const setAuthState = useSetRecoilState(authState);

  const {mutate, error} = useMutation({
    mutationFn: async ({
      email,
      password,
      isAutoLogin,
    }: {
      email: string;
      password: string;
      isAutoLogin: boolean;
    }) => {
      const result = await handleLogin({email, password, isAutoLogin});
      return result;
    },
    onSuccess: async (data, variables) => {
      const authToken = data.headers['authorization'];
      setAuthState({email: variables.email, authToken});

      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    },
    onError: err => {
      console.log('LOGIN ERROR:', err);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onLoginPress = async ({
    email,
    password,
    isAutoLogin,
  }: {
    email: string;
    password: string;
    isAutoLogin: boolean;
  }) => {
    try {
      setIsLoading(true);
      mutate({email, password, isAutoLogin});
    } catch (e) {
      console.log('onLoginPress Error:', e);
      setIsLoading(false);
    }
  };

  return {
    error,
    onLoginPress,
  };
};
