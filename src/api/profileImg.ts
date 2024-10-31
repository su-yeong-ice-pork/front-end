// src/api/profileImage.ts
import apiClient from './axiosInstance';
import {getItem} from './asyncStorage';

interface ApiResponse {
  success: boolean;
  response: null;
  error: {
    status: number;
    message: string;
  } | null;
}

// 프로필 이미지 업데이트 함수
export const updateProfileImage = async (
  id: number,
  authToken: string,
  type: string, // 'image' or 'banner'
  imageBlob: Blob,
): Promise<boolean> => {
  try {
    // 토큰 가져오기
    // const token = await getItem('authToken');

    // FormData로 이미지 Blob 설정
    const formData = new FormData();
    const fieldName = type === 'banner' ? 'bannerImage' : 'profileImage';
    formData.append(fieldName, imageBlob);

    // PATCH 요청
    const response = await apiClient.patch<ApiResponse>(
      `/members/${id}/profile-${type}`,
      formData,
      {
        headers: {
          Authorization: `${authToken}`,
          'Content-Type': 'multipart/form-data', // FormData를 보낼 때 Content-Type 설정
        },
      },
    );

    if (response.data.success) {
      console.log('프로필 이미지가 성공적으로 업데이트되었습니다.');
      return true;
    } else {
      console.error(
        'API 에러:',
        response.data.error?.message || '알 수 없는 에러',
      );
      return false;
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    return false;
  }
};
