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
      console.log('������ �̹����� ���������� ������Ʈ�Ǿ����ϴ�.');
      return true;
    } else {
      console.error(
        'API ����:',
        response.data.error?.message || '�� �� ���� ����',
      );
      return false;
    }
  } catch (error) {
    console.error('��Ʈ��ũ ����:', error);
    return false;
  }
};
