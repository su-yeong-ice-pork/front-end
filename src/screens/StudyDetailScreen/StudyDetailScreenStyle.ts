import {COLOR} from '@/src/constants/styles/color/color';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const StudyDeatilScreenStyle = StyleSheet.create({
  outContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: `${COLOR.BACK_GROUND}`,
  },
  main: {
    paddingHorizontal: 20,
    alignItems: 'center',
    width: width,
    paddingBottom: 10,
  },
});
