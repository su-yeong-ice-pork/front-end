import apiClient from './axiosInstance';

export interface MyPageRecordResponse {
  success: boolean;
  response: {
    totalStreak: number;
    totalStudyTime: number;
    createdDate: string;
  };
  error: any;
}

export const getMyPageRecord = async (
  authToken: string,
): Promise<MyPageRecordResponse> => {
  try {
    if (!authToken) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      throw new Error('토큰이 없습니다.');
    }
    const response = await apiClient.get<MyPageRecordResponse>(
      '/members/my-page/record',
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
