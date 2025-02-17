import {useQuery} from '@tanstack/react-query';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import {fetchRegularStudies} from '../api/study/studies/studies';
import {Study} from '../api/study/types';

export const useStudies = () => {
  const auth = useRecoilValue(authState);
  return useQuery<Study[], Error>({
    queryKey: ['regularStudies'],
    queryFn: () => fetchRegularStudies(auth.authToken),
    staleTime: 1000 * 60 * 5,
  });
};
