import {StyleSheet} from 'react-native-css-interop';

export const ProfileStyles = StyleSheet.create({
  profileBox: {position: 'relative', height: 150},
  profileImageBackgroud: {width: '100%', height: 100},
  profileImageContainer: {
    marginTop: -70, // 프로필과 배너 겹치기
  },
  profileImage: {
    position: 'relative',
    width: 80,
    height: 80,
    marginLeft: 40,
  },
  profileAvatar: {width: 100, height: 100},
  backButtonWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10, // 터치 영역 확대
  },
  editIcon: {
    position: 'absolute',
    width: 30, // 이전에 제안된 크기 유지
    height: 30, // 이전에 제안된 크기 유지
    right: -30, // profileImage의 우측 바깥쪽 경계에 위치시키기 위한 값
    bottom: -5, // profileImage의 하단 바깥쪽 경계에 위치시키기 위한 값
    resizeMode: 'contain', // 이미지 비율 유지
  },
});
