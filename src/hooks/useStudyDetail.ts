import {useQuery} from '@tanstack/react-query';
import {useRecoilValue} from 'recoil';
import authState from '@/src/recoil/authAtom';
import {fetchStudyDetail} from '@/src/api/study/studyDetail/studyDetail';
import {StudyDetail} from '@/src/api/study/types';

export const useStudyDetail = (studyId: number) => {
  const auth = useRecoilValue(authState);
  return useQuery<StudyDetail, Error>({
    queryKey: ['studyDetail', studyId],
    queryFn: () => fetchStudyDetail(studyId, auth.authToken),
    enabled: !!studyId,
  });
};
