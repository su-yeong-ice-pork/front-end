import apiClient from '../axiosInstance';
import {LoginPropsType} from './loginPropsType';

const handleLogin = async ({email, password}: LoginPropsType) => {
  try {
    const response = await apiClient.post('/members/login', {
      email,
      password,
    });
    const refreshToken = response.data.response.refreshToken;

    return {
      success: true,
      data: {
        refreshToken,
      },
      headers: response.headers,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// 자동 로그인 함수
export const autoLogin = async (refreshToken: string) => {
  try {
    const response = await apiClient.post('/members/auto-login', {
      refreshToken,
    });

    return {
      success: true,
      headers: response.headers,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export default handleLogin;
