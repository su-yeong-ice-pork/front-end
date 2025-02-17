import {Dimensions, StyleSheet} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';

const {width, height} = Dimensions.get('window');

export const ChoiceRankingButtonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.015,
  },

  buttonIcon: {
    width: height * 0.014,
    height: height * 0.018,
    marginHorizontal: width * 0.03,
  },

  rankingText: {
    fontFamily: FONT,
    fontSize: height * 0.018,
    fontWeight: '800',
    color: '#009499',
  },
});
