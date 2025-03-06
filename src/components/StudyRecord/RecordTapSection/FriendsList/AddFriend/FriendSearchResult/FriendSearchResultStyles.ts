import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';
import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const FriendSearchResultStyles = StyleSheet.create({
  boxContainer: {
    justifyContent: 'center',
  },
  container: {
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.08,
    height: width * 0.08,
    marginRight: 10,
    resizeMode: 'contain',
  },
  profileText: {
    fontFamily: FONT,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: '800',
  },
  inviteButton: {
    position: 'absolute',
    right: width * 0.03,
    borderRadius: 30,
    backgroundColor: COLOR.MAIN,
  },
});
