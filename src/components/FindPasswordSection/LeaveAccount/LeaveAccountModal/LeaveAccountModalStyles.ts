import {StyleSheet, Dimensions} from 'react-native';

import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';

const {width} = Dimensions.get('window');

export const LeaveAccountModalStyles = StyleSheet.create({
  logoutModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoutModalView: {
    width: width * 0.8,
    backgroundColor: `${COLOR.WHITE}`,
    borderRadius: 10,
  },
  logoutModalHeader: {
    flexDirection: 'row',
    backgroundColor: '#009499',
    height: 50,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
  },
  logoutModalTextWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutModalText: {
    color: `${COLOR.WHITE}`,
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  logoutModalCloseButton: {
    position: 'absolute',
    right: 10,
  },
  logoutModalCloseIcon: {
    width: 20,
    height: 20,
  },
  logoutModalContent: {
    padding: 20,
    alignItems: 'center',
  },
  logoutModalDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '800',
    fontFamily: `${FONT}`,
    color: `${COLOR.BLACK}`,
  },
  logoutModalButton: {
    backgroundColor: '#009499',
    borderRadius: 20,
    width: width * 0.3,
    padding: 10,
  },
  passwordInput: {
    width: '100%',
    height: 40,
    borderColor: '#B9B9B9',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: `${COLOR.WHITE}`,
  },
  logoutModalButtonText: {
    color: `${COLOR.WHITE}`,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: `${FONT}`,
  },
});
