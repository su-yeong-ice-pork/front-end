import {useQuery} from '@tanstack/react-query';
import {useRecoilState} from 'recoil';
import signUpState from '@/src/recoil/signUpAtom';
import checkName from '@/src/api/signUp/name';
import {CheckNameResponse} from '@/src/api/signUp/types';

export const useCheckName = () => {
  const [signUp, setSignUp] = useRecoilState(signUpState);

  const {refetch: getCheckName} = useQuery<CheckNameResponse>({
    queryKey: ['checkName', signUp.name],
    queryFn: () => checkName(signUp.name),
    enabled: false,
  });

  const checkNameAsync = async (name: string) => {
    setSignUp({...signUp, name: name});
    const result = await getCheckName();
    if (result.data && result.data.success) {
      setSignUp({...signUp, name, nickNameVerified: true});
    }
  };

  return {checkName: checkNameAsync};
};
