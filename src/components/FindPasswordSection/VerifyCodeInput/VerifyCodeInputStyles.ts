import {StyleSheet, Dimensions} from 'react-native';

import {COLOR} from '@/src/constants/styles/color/color';

const {width, height} = Dimensions.get('window');

export const VerifyCodeInputStyles = StyleSheet.create({
  inputContainer: {
    marginTop: 0,
    marginBottom: height * 0.005,
  },

  inputBox: {
    height: height * 0.06,
    backgroundColor: `${COLOR.WHITE}`,
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: `${COLOR.BLACK}`,
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
    borderBottomWidth: 1.5,
    borderBottomColor: '#A9A9A9',
  },
  verifyButton: {
    marginLeft: width * 0.02,
    backgroundColor: '#009499',
    borderRadius: 20,
    paddingHorizontal: width * 0.04,
    justifyContent: 'center',
    height: height * 0.04,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  timerText: {
    marginLeft: 10,
    color: '#FF7777',
    fontSize: 12,
    textAlign: 'right',
  },
});
