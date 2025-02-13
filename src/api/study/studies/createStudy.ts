import apiClient from '@/src/api/axiosInstance';
import {AxiosResponse} from 'axios';
import {CreateStudyRequest, CreateStudyResponse} from '../types';

/**
 * POST /regular-studies API 호출
 * @param newStudy 생성할 스터디 정보
 * @param authToken 인증 토큰
 * @returns 응답의 response 객체
 */
export const createStudy = async (
  newStudy: CreateStudyRequest,
  authToken: string,
): Promise<{inviteCode: string}> => {
  const response: AxiosResponse<CreateStudyResponse> = await apiClient.post(
    '/regular-studies',
    newStudy,
    {
      headers: {Authorization: authToken},
    },
  );
  if (!response.data.success) {
    throw new Error(response.data.error || '스터디 생성에 실패했습니다.');
  }
  return response.data.response;
};
