import apiClient from './axiosInstance';
import {getItem} from './asyncStorage';

export interface DefaultImg {
  id: number;
  url: string;
}

interface ApiResponse {
  success: boolean;
  response: {
    profileImages: DefaultImg[];
  };
  error: any;
}

export const GetDefaultImages = async (
  authToken: string,
  id: string, // 매개변수로 id 받아옴
  Imgtype: string, // 'profile' or 'banner'
): Promise<DefaultImg[] | null> => {
  try {
    if (!authToken) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      return null;
    }

    const response = await apiClient.get<ApiResponse>(
      `/members/${id}/${Imgtype}-images`,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );
    if (response.data.success) {
      if (Imgtype == 'profile') {
        return response.data.response.profileImages;
      } else if (Imgtype == 'banner') {
        return response.data.response.bannerImages;
      }
    } else {
      console.error('API 에러:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
