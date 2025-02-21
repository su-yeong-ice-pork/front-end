import {Dimensions, StyleSheet} from 'react-native';
import {COLOR} from '@/src/constants/styles/color/color.ts';

const {height} = Dimensions.get('window');

export const CreateStudyFormStyles = StyleSheet.create({
  fullContainer: {
    width: '100%',
    backgroundColor: '#1B9DC1',
    paddingBottom: height * 0.2,
  },

  inputContainer: {
    backgroundColor: COLOR.BACK_GROUND,
    paddingBottom: height * 0.035,
  },
});
