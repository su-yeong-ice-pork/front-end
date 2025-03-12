import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';

export const FriendsMessageStyles = StyleSheet.create({
  friendMessageSection: {
    marginTop: height * 0.025,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.02,
    position: 'relative',
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: width * 0.035,
    color: '#838F8F',
    fontFamily: `${FONT}`,
  },
  friendMessageButton: {
    backgroundColor: '#5AA6A8',
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.015,
    borderBottomLeftRadius: 0,
    marginTop: height * 0.012,
    alignSelf: 'flex-start',
  },
  friendMessageText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontFamily: `${FONT}`,
    fontWeight: '700',
  },
});
