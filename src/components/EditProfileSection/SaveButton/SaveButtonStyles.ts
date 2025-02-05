import {StyleSheet} from 'react-native';
import {COLOR} from '@/src/constants/styles/color/color';
export const SaveButtonStyles = StyleSheet.create({
  signUpButton: {
    height: 70,
    width: 160,
    borderRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: COLOR.BACK_GROUND,
  },
  signUpButtonGradient: {
    flex: 1,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: COLOR.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
