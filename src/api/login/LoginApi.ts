import {getItem} from '../asyncStorage';
import apiClient from '../axiosInstance';
import {LoginPropsType} from './loginPropsType';

const handleLogin = async ({email, password}: LoginPropsType) => {
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
};

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

export const fetchAutoLogin = async () => {
  const autoLoginFlag = await getItem('autoLogin');
  const refreshToken = await getItem('refreshToken');

  if (autoLoginFlag === 'Y' && refreshToken) {
    const response = await autoLogin(refreshToken);
    return response;
  }

  return null;
};

export default handleLogin;
