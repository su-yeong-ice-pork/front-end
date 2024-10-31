import apiClient from './axiosInstance';

export interface StudyTimeResponse {
  success: boolean;
  response: {
    todayStudyTime: string;
    totalStudyTime?: string;
  };
  error: any;
}
export interface AttendanceResponse {
  success: boolean;
  response: {
    attendance: boolean;
  };
  error: any;
}

// 공부 시간 조회
export const getStudyTime = async (
  authToken: string,
): Promise<StudyTimeResponse> => {
  try {
    if (!authToken) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      throw Error;
    }
    const response = await apiClient.get<StudyTimeResponse>(
      '/grass/study-time',
      {
        headers: {
          Authorization: authToken,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudyTime = async (
  todayStudyTime: string,
  authToken: string,
): Promise<StudyTimeResponse> => {
  try {
    if (!authToken) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      throw new Error('토큰이 없습니다.');
    }
    console.log(authToken, todayStudyTime);
    const response = await apiClient.patch<StudyTimeResponse>(
      '/grass/study-time',
      {todayStudyTime},
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTodayAttendance = async (
  authToken: string,
): Promise<AttendanceResponse> => {
  try {
    if (!authToken) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      throw new Error('토큰이 없습니다.');
    }
    const response = await apiClient.get<AttendanceResponse>(
      '/grass/attendance/today',
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
