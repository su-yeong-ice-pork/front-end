import {StyleSheet, Dimensions} from 'react-native';
import {COLOR} from '@/src/constants/styles/color/color';

const {width} = Dimensions.get('window');

export const StudyListStyles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: `${COLOR.WHITE}`,
    alignItems: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#d1d5db',
  },
});
