import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';
import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const NotificationItemStyles = StyleSheet.create({
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
    width: 48,
    height: 48,
    marginRight: 16,
    marginTop: 10,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  senderText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#52525b',
    fontFamily: `${FONT}`,
  },
  contentText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#71717a',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  timeText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#a3a3a3',
    fontFamily: `${FONT}`,
  },
});
