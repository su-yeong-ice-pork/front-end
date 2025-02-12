import {useQuery} from '@tanstack/react-query';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import {fetchStudyParticipants} from '@/src/api/study/studyDetail/studyParticipants';
import {Participant} from '../api/study/types';

export const useStudyParticipants = (studyId: number) => {
  const auth = useRecoilValue(authState);
  return useQuery<Participant[], Error>({
    queryKey: ['studyParticipants', studyId],
    queryFn: () => fetchStudyParticipants(studyId, auth.authToken),
    enabled: !!studyId,
  });
};
