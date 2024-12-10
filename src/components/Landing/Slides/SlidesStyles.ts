import {Dimensions, StyleSheet} from 'react-native';

import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';

export const {width} = Dimensions.get('window');

export const SlidesStyles = StyleSheet.create({
  slide: {
    width: width,
    justifyContent: 'center',
    paddingTop: 0,
    marginBottom: 0,
  },
  mainText: {
    fontSize: 28,
    color: `${COLOR.WHITE}`,
    fontFamily: `${FONT}`,
    fontWeight: '900',
    textAlign: 'left',
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  subText: {
    fontSize: 16,
    color: '#378260',
    fontFamily: `${FONT}`,
    textAlign: 'left',
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  highlight: {
    color: '#00470D',
  },
  slideImage: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 0,
    alignSelf: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#009499',
    marginHorizontal: 5,
  },
});
