import apiClient from '../axiosInstance';
import {ApiResponse, StudyTimeResponse} from './types';

export const getStudyTime = async (
  token: string,
): Promise<ApiResponse<StudyTimeResponse>> => {
  const response = await apiClient.get<ApiResponse<StudyTimeResponse>>(
    '/grass/study-time',
    {
      headers: {Authorization: `${token}`},
    },
  );
  return response.data;
};
