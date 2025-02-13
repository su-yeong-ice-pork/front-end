import apiClient from '../axiosInstance';
import {ApiResponse, DefaultImg} from './getImageType';

export const GetDefaultImages = async (
  authToken: string,
  id: string,
  Imgtype: string,
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
          Authorization: authToken,
        },
      },
    );

    if (response.data.success) {
      if (Imgtype === 'profile') {
        return response.data.response.profileImages;
      } else if (Imgtype === 'banner') {
        if (response.data.response.bannerImages) {
          return response.data.response.bannerImages;
        } else {
          console.error('배너 이미지 데이터가 없습니다.');
          return null;
        }
      } else {
        console.error('알 수 없는 이미지 타입:', Imgtype);
        return null;
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
