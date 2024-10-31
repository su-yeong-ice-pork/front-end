// src/api/record.ts
import apiClient from './axiosInstance';
interface Record {
  currentStreak: number;
  maxStreak: number;
  totalStudyTime: number;
}

interface RecordApiResponse {
  success: boolean;
  response: {
    record: Record;
  };
  error: any;
}

export const getRecord = async (
  id: number,
  authToken: string,
): Promise<Record | null> => {
  try {
    const response = await apiClient.get<RecordApiResponse>(
      `/members/${id}/record`,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );

    if (response.data.success && response.data) {
      return response.data.response;
    } else {
      console.error('API 에러:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
