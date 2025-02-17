import {useQuery} from '@tanstack/react-query';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import {fetchIndividualRanking} from '@/src/api/rankings/individual';
import {IndividualRanking} from '@/src/api/rankings/types';

export const useIndividualRanking = () => {
  const auth = useRecoilValue(authState);
  return useQuery<{date: string; ranking: IndividualRanking[]}, Error>({
    queryKey: ['individualRanking'],
    queryFn: () => fetchIndividualRanking(auth.authToken),
  });
};
