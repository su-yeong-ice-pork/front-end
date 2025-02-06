import apiClient from '@/src/api/axiosInstance';
import {Participant, GetStudyParticipantsResponse} from '../types';

export const fetchStudyParticipants = async (
  studyId: number,
  authToken: string,
): Promise<Participant[]> => {
  const response = await apiClient.get<GetStudyParticipantsResponse>(
    `/regular-studies/${studyId}/participants`,
    {
      headers: {Authorization: authToken},
    },
  );

  if (!response.data.success) {
    throw new Error(
      response.data.error || '스터디 참가자 정보를 불러오는데 실패했습니다.',
    );
  }
  return response.data.response.participants;
};
