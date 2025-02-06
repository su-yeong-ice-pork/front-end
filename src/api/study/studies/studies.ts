// src/api/studies.ts
import apiClient from '@/src/api/axiosInstance';
import {Study, GetRegularStudiesResponse} from '../types';

export const fetchRegularStudies = async (
  authToken: string,
): Promise<Study[]> => {
  const response = await apiClient.get<GetRegularStudiesResponse>(
    '/regular-studies',
    {
      headers: {Authorization: authToken},
    },
  );
  if (!response.data.success) {
    throw new Error(
      response.data.error || '스터디 데이터를 불러오는데 실패했습니다.',
    );
  }
  return response.data.response.regularStudies;
};
