import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';

export const CheerUpTextStyles = StyleSheet.create({
  supportTextSection: {
    padding: width * 0.02,
    backgroundColor: '#F2F4F6',
    borderRadius: width * 0.02,

    marginHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.035,
    marginLeft: width * 0.012,
    fontWeight: 'bold',
    color: '#838F8F',
    marginBottom: height * 0.01,
    fontFamily: `${FONT}`,
  },

  textInputPlaceholder: {
    flex: 1,
    fontSize: 11,
    borderColor: '#5AA6A8',
    color: '#333',
    marginLeft: 5,
    marginTop: 3,
  },
  sendButton: {
    backgroundColor: '#5AA6A8',
    borderRadius: width * 0.015,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.012,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#5AA6A8',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.035,
    fontWeight: 'bold',
    fontFamily: `${FONT}`,
  },
  infoText: {
    fontSize: width * 0.03,
    color: '#009499',
    marginTop: height * 0.005,
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: `${FONT}`,
  },
});
