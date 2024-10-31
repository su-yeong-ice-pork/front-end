//login.ts
import {useSetRecoilState} from 'recoil';
import {getItem} from './asyncStorage';
import apiClient from './axiosInstance';
import axios from 'axios';
import authState from '../recoil/authAtom';

const handleLogin = async (email: string, password: string) => {
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

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const setAuthState = useSetRecoilState(authState);

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = await getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await apiClient.post('/members/auto-login', {
            refreshToken,
          });
          const newAuthToken = response.headers['authorization'];
          originalRequest.headers['Authorization'] = `${newAuthToken}`;
          setAuthState({email: '', authToken: newAuthToken});
          return apiClient(originalRequest);
        } catch (err) {
          //예외 처리 방식 생각해봐야함 !
        }
      }
    }

    return Promise.reject(error);
  },
);

export default handleLogin;
