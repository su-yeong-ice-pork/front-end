import {useMutation} from '@tanstack/react-query';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import {CreateStudyRequest} from '../api/study/types';
import {createStudy} from '../api/study/studies/createStudy';

export const useCreateStudy = () => {
  const auth = useRecoilValue(authState);
  return useMutation<{inviteCode: string}, Error, CreateStudyRequest>({
    mutationFn: (newStudy: CreateStudyRequest) =>
      createStudy(newStudy, auth.authToken),
    onSuccess: data => {
      console.log('Invite Code:', data.inviteCode);
      //Invite Code를 보여주는 모달로 Params와 같이 Navigate 하면 될 것 같아용
    },
  });
};
