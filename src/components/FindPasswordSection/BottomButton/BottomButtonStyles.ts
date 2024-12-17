import {StyleSheet, Dimensions} from 'react-native';
import {COLOR} from '@/src/constants/styles/color/color';

const {width, height} = Dimensions.get('window');

export const BottomButtonStyles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  signUpButton: {
    height: height * 0.07,
    width: width * 0.5,
    marginBottom: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
  signUpButtonGradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: `${COLOR.WHITE}`,
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
