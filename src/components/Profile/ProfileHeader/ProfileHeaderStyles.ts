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
});
