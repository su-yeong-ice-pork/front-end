import {useQuery} from '@tanstack/react-query';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import {fetchGroupRanking} from '@/src/api/rankings/studies';
import {GroupRanking} from '@/src/api/rankings/types';

export const useGroupRanking = () => {
  const auth = useRecoilValue(authState);
  return useQuery<{date: string; ranking: GroupRanking[]}, Error>({
    queryKey: ['groupRanking'],
    queryFn: () => fetchGroupRanking(auth.authToken),
    staleTime: 1000 * 60 * 5,
  });
};
