import {StyleSheet, Dimensions} from 'react-native';
import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';

const {width} = Dimensions.get('window');

export const FriendNotificationStyles = StyleSheet.create({
  container: {
    width: width * 0.9,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: width * 0.05,
    marginTop: 12,
    backgroundColor: `${COLOR.WHITE}`,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
    marginTop: 10,
    resizeMode: 'contain',
  },
  textContainer: {
    fontSize: 14,
    fontWeight: '800',
    color: '#52525b',
    fontFamily: `${FONT}`,
  },
  buttonContainer: {
    marginTop: 8,
  },
  buttonImage: {
    resizeMode: 'contain',
    width: 12,
    height: 12,
  },
  allowButton: {
    width: 100,
    backgroundColor: `${COLOR.MAIN}`,
    marginRight: 10,
  },
  denyButton: {
    width: 100,
    backgroundColor: '#F86163',
  },
  timeText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#a3a3a3',
    fontFamily: `${FONT}`,
  },
});
