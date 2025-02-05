import {useMutation} from '@tanstack/react-query';
import {useRecoilValue} from 'recoil';
import signUpState from '@/src/recoil/signUpAtom';
import {SignUpResponse} from '@/src/api/signUp/types';
import handleSignup from '../api/signUp/signUp';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../components/types/NavigationType/NavigationType';

export const useSignUp = () => {
  const signUp = useRecoilValue(signUpState);
  const navigation = useNavigation<RootStackNavigationProp>();
  const {mutate: signupMutate} = useMutation({
    mutationFn: async () => {
      if (!signUp.emailVerified) {
        throw new Error('이메일 인증이 완료되지 않았습니다.');
      }
      if (!signUp.nickNameVerified) {
        throw new Error('닉네임 중복확인을 완료하세요.');
      }
      const response: SignUpResponse = await handleSignup(signUp);
      return response;
    },
  });

  const onSignUpPress = () => {
    signupMutate();
    navigation.navigate('Landing');
  };

  return {onSignUpPress};
};
