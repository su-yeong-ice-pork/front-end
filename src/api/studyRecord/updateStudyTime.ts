import apiClient from '../axiosInstance';
import {ApiResponse, StudyTimeResponse, UpdateStudyTimePayload} from './types';

export const updateStudyTime = async (
  payload: UpdateStudyTimePayload,
  token: string,
): Promise<ApiResponse<StudyTimeResponse>> => {
  const response = await apiClient.patch<ApiResponse<StudyTimeResponse>>(
    '/grass/study-time',
    payload,
    {headers: {Authorization: `${token}`}},
  );
  return response.data;
};
