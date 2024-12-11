import {StyleSheet, Dimensions} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

const {width, height} = Dimensions.get('window');

export const NameInputStyles = StyleSheet.create({
  inputContainer2: {
    marginTop: 0,
    paddingTop: height * 0.02,
    marginBottom: height * 0.025,
  },
  inputLabel: {
    fontFamily: `${FONT}`,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#454545',
    marginBottom: height * 0.005,
  },
  starmark: {
    color: '#FF7360',
  },
  inputBox: {
    height: height * 0.06,
    backgroundColor: `${COLOR.WHITE}`,
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: `${COLOR.BLACK}`,
  },
  clearIcon: {
    width: width * 0.04,
    height: height * 0.02,
    borderRadius: 10,
  },
  codeInputBox: {
    flex: 1,
    backgroundColor: `${COLOR.WHITE}`,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  requestCodeButton: {
    marginLeft: width * 0.02,
    backgroundColor: '#009499',
    borderRadius: 25,
    paddingHorizontal: width * 0.04,
    justifyContent: 'center',
    height: height * 0.05,
  },
  requestCodeButtonText: {
    color: `${COLOR.WHITE}`,
    fontSize: 11,
    borderRadius: 20,
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.0005,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  codeButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#009499',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  resetButton: {
    position: 'absolute',
    right: 5,
    paddingHorizontal: 15,
  },
  activeText: {
    fontFamily: `${FONT}`,
    fontWeight: 'bold',
    color: '#009499',
    fontSize: 11,
  },
  setiIcon: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
});
