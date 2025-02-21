import {StyleSheet} from 'react-native-css-interop';

export const ProfileStyles = StyleSheet.create({
  profileBox: {position: 'relative', height: 150},
  profileImageBackgroud: {width: '100%', height: 100},
  profileImageContainer: {
    marginTop: -70,
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
    padding: 10,
  },
  editIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    right: -30,
    bottom: -5,
    resizeMode: 'contain',
  },
});
