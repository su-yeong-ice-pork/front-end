import apiClient from './axiosInstance';

export interface Member {
  id: number;
  name: string;
  profileImage: string | null;
  mainTitle: string;
  freezeCount: number;
  mainBanner?: string;
  friendCount?: number;
  studyCount?: number;
  message?: string;
}

interface ApiResponse {
  success: boolean;
  response: {
    member: Member;
  };
  error: any;
}

export const getMemberData = async (
  authToken: string,
): Promise<Member | null> => {
  try {
    if (!authToken) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      return null;
    }

    const response = await apiClient.get<ApiResponse>('/members', {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    if (response.data.success) {
      return response.data.response.member;
    } else {
      console.error('API 에러:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
