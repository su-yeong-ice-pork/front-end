import {Dimensions, StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

const {width} = Dimensions.get('window');

export const StudyHeaderStyle = StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: width - 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    lineHeight: 32,
    fontFamily: `${FONT}`,
  },
  highlight: {
    color: `${COLOR.HIGHLIGHT}`,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
    fontFamily: `${FONT}`,
  },
  headerImage: {
    width: 30,
    height: 30,
    marginRight: 170,
    resizeMode: 'contain',
  },
});
