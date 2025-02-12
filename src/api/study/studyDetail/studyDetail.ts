import apiClient from '@/src/api/axiosInstance';
import {StudyDetail, GetStudyDetailResponse} from '../types';

/**
 * 고정 스터디 상세 정보 가져오기
 * GET: /regular-studies/${studyId}
 * Header: Authorization: Auth Token
 */
export const fetchStudyDetail = async (
  studyId: number,
  authToken: string,
): Promise<StudyDetail> => {
  const response = await apiClient.get<GetStudyDetailResponse>(
    `/regular-studies/${studyId}`,
    {
      headers: {Authorization: authToken},
    },
  );
  if (!response.data.success) {
    throw new Error(
      response.data.error || '스터디 상세 정보를 불러오는데 실패했습니다.',
    );
  }
  return response.data.response;
};
