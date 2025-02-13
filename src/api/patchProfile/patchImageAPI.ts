import apiClient from '../axiosInstance';
import {patchImageApiResponse} from './patchImageType';

export const updateProfileImage = async (
  id: number,
  authToken: string,
  type: string,
  imageBlob: Blob,
): Promise<boolean> => {
  try {
    const formData = new FormData();
    const fieldName = type === 'banner' ? 'bannerImage' : 'profileImage';
    formData.append(fieldName, imageBlob);

    const response = await apiClient.patch<patchImageApiResponse>(
      `/members/${id}/profile-${type}`,
      formData,
      {
        headers: {
          Authorization: authToken,
          'Content-Type': 'multipart/form-data',
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
