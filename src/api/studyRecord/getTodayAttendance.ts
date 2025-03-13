import apiClient from '../axiosInstance';
import {ApiResponse, AttendanceResponse} from './types';

export const getTodayAttendance = async (
  token: string,
): Promise<ApiResponse<AttendanceResponse>> => {
  const response = await apiClient.get<ApiResponse<AttendanceResponse>>(
    '/grass/attendance/today',
    {
      headers: {Authorization: `${token}`},
    },
  );
  return response.data;
};
