import apiClient from '@/src/api/axiosInstance';
import {Participant, GetStudyParticipantsResponse} from '../types';

/**
 * 고정 스터디 소속 멤버 정보 가져오기
 * GET: /regular-studies/${studyId}/participants
 * Header: Authorization: Auth Token
 */
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
