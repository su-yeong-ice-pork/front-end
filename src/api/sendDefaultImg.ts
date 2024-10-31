// sendDefaultImg.ts
import apiClient from './axiosInstance';

// 요청 Body
export interface ResetPasswordData {
  url: string;
}

// 요청 Body - 성공
export interface ResetPasswordResponse {
  success: boolean;
  response: null;
  error: null;
}

const sendDefaultImg = async (
  id: string,
  authToken: string,
  type: string,
  data: {url: string}, // 명세서에 따른 데이터 형식
): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.patch(
      `/members/${id}/default-${type}`, // 명세서에 맞는 URL
      data,
      {
        headers: {
          Authorization: `${authToken}`, // 명세서에 따른 인증 방식
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`에러가 발생했습니다: ${error.message}`);
  }
};

export default sendDefaultImg;
