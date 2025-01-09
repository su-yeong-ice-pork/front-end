import {getItem, setItem} from '../storage/encryptedStorage';
import apiClient from '../axiosInstance';
import {LoginPropsType} from './loginPropsType';

const handleLogin = async ({email, password, isAutoLogin}: LoginPropsType) => {
  try {
    const response = await apiClient.post('/members/login', {
      email,
      password,
    });
    const refreshToken = response.data.response.refreshToken;
    await setItem('refreshToken', refreshToken);
    if (isAutoLogin) {
      await setItem('autoLogin', 'Y');
    } else {
      await setItem('autoLogin', '');
    }

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

/**
 * @description
 *  - AsyncStorage에서 autoLogin 플래그와 refreshToken을 꺼내서,
 *    auto-login API를 호출하는 함수 (자동 로그인시 tanstack-query에 의해 호출됩니당!)
 */
export const fetchAutoLogin = async () => {
  const autoLoginFlag = await getItem('autoLogin');
  const refreshToken = await getItem('refreshToken');
  try {
    if (autoLoginFlag === 'Y' && refreshToken) {
      const response = await autoLogin(refreshToken);
      return response;
    }
    return {
      success: false,
      data: null,
      headers: null,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'fetchAutoLogin Error',
    };
  }
};

export default handleLogin;
