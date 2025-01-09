import {useQuery} from '@tanstack/react-query';
import {fetchAutoLogin} from '@/src/api/login/LoginApi';
import {useSetRecoilState} from 'recoil';
import authState from '@/src/recoil/authAtom';
import {AUTH, SIGN} from '@/src/constants/Api/Sign';

/**
 * 자동 로그인
 * @param onSuccessCallback 매개변수: 자동로그인이 완료된 후 수행할 작업
 */

export const useAutoLogin = (onSuccessCallback?: () => void) => {
  const setAuthState = useSetRecoilState(authState);

  const queryResult = useQuery({
    queryKey: [SIGN.IN_AUTO],
    queryFn: fetchAutoLogin,
    select: async data => {
      if (data?.success) {
        const authToken = await data?.headers[AUTH];
        setAuthState({email: '', authToken});
        onSuccessCallback?.();
      }
    },
  });
  return queryResult;
};
