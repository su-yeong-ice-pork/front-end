import {StyleSheet} from 'react-native';

export const IMAGE_ALT = '프로필 이미지입니다.';
export const ProfileImageStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 71,
    height: 71,
    borderRadius: 35.5,
    resizeMode: 'cover',
  },
  textContainer: {
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: '#009499',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  name: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
});
