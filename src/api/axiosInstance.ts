// apiClient.ts
import axios from 'axios';
import {getItem, setItem} from './asyncStorage';
import {Alert} from 'react-native';
import {NavigationContainerRef} from '@react-navigation/native';
import {updateAuthToken} from '../recoil/authAtom';

// 네비게이션 객체를 저장할 변수 선언
let navigator: NavigationContainerRef<any> | null = null;

// 네비게이션 객체를 설정하는 함수
export const setNavigator = (nav: NavigationContainerRef<any>) => {
  navigator = nav;
};

const apiClient = axios.create({
  baseURL:
    'https://grass-server-fua8cyfhabacbgbn.koreasouth-01.azurewebsites.net/api/v1',
});

apiClient.interceptors.response.use(
  response => response, // 성공적인 응답은 그대로 반환
  async error => {
    const originalRequest = error.config; // 원래 요청 정보 저장

    // 401 또는 403 에러 발생 시 토큰 갱신 시도
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry // 재시도 플래그 확인
    ) {
      originalRequest._retry = true; // 재시도 플래그 설정

      const refreshToken = await getItem('refreshToken'); // 저장된 리프레시 토큰 가져오기
      if (!refreshToken) {
        // 리프레시 토큰이 없을 경우 처리
        if (originalRequest.url !== '/members/login') {
          Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
        }

        await setItem('refreshToken', '');
        await setItem('autoLogin', '');
        // 네비게이션을 사용하여 로그인 화면으로 이동
        if (navigator) {
          navigator.reset({
            index: 0,
            routes: [{name: 'Landing'}],
          });
        }
        return Promise.reject(error);
      }

      try {
        // 리프레시 토큰을 사용하여 액세스 토큰 갱신
        const response = await apiClient.post('/members/auto-login', {
          refreshToken,
        });
        console.log(response);
        const newAccessToken = response.headers['authorization']; // 새로운 액세스 토큰 받아오기
        console.log(newAccessToken);
        originalRequest.headers['Authorization'] = newAccessToken; // 새로운 액세스 토큰을 요청 헤더에 설정
        updateAuthToken(newAccessToken);
        return apiClient(originalRequest); // 원래 요청 재시도
      } catch (err) {
        // 토큰 갱신 실패 시 처리
        if (originalRequest.url !== '/members/login') {
          Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
        await setItem('refreshToken', '');
        await setItem('autoLogin', '');
        if (navigator) {
          navigator.reset({
            index: 0,
            routes: [{name: 'Landing'}],
          });
        }
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(error);
    }
  },
);

export default apiClient;
