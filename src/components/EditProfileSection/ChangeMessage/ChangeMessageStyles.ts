import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {COLOR} from '@/src/constants/styles/color/color';
export const ChangeMessageStyles = StyleSheet.create({
  inputContainer2: {
    marginTop: 0,
    paddingTop: height * 0.02,
    marginBottom: height * 0.025,
  },
  textStyle: {
    color: '#838F8F',
    fontWeight: 'bold',
    fontSize: width * 0.035,
    marginBottom: 5,
  },
  inputBox: {
    height: height * 0.06,
    fontSize: 10,
    backgroundColor: COLOR.WHITE,
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#000000',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  resetButton: {
    position: 'absolute',
    right: 5,
    paddingHorizontal: 15,
    backgroundColor: COLOR.WHITE,
  },
  clearIcon: {
    width: width * 0.04,
    height: height * 0.02,
    borderRadius: 10,
  },
});
