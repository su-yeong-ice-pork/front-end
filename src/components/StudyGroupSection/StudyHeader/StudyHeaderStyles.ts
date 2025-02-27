import {Dimensions, StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

const {width} = Dimensions.get('window');

export const StudyHeaderStyle = StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: width - 40,
    marginBottom: 20,
    marginTop:20,
  },
  title: {
    fontSize: width * 0.052,
    fontWeight: 700,
    color: '#1e293b',
    lineHeight: 32,
    fontFamily: FONT,
  },
  highlight: {
    fontSize: width * 0.057,
    fontWeight: 800,
    fontFamily: FONT,
    color: '#009499',
  },
  headerImage: {
    width: 30,
    height: 30,
    marginRight: 170,
    resizeMode: 'contain',
  },
});
