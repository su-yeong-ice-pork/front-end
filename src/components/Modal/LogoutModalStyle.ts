import {Dimensions, StyleSheet} from "react-native";
import {COLOR} from "@/src/constants/styles/color/color.ts";
import {FONT} from '@/src/constants/styles/font/default-font';

const {width} = Dimensions.get('window');

const highlight = '#009499';
const pixel10 = width*0.028;

export const LogoutModalStyles = StyleSheet.create({
  logoutModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoutModalView: {
    width: width * 0.8,
    backgroundColor: COLOR.WHITE,
    borderRadius: 10,
  },
  logoutModalHeader: {
    flexDirection: 'row',
    backgroundColor: highlight,
    height: pixel10*5,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: pixel10,
  },
  logoutModalTextWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutModalText: {
    color: COLOR.WHITE,
    fontSize: pixel10*1.5,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    fontFamily:`${FONT}`
  },
  logoutModalCloseButton: {
    position: 'absolute',
    right: pixel10,
  },
  logoutModalCloseIcon: {
    width: pixel10*2,
    height: pixel10*2,
  },
  logoutModalContent: {
    padding: pixel10*2,
    alignItems: 'center',
  },
  logoutModalDescription: {
    fontSize: pixel10*1.2,
    lineHeight: pixel10*1.7,
    textAlign: 'center',
    marginBottom: pixel10*1.5,
    fontWeight: '600',
    fontFamily: `${FONT}`,
    color: COLOR.BLACK,
  },
  logoutModalButton: {
    backgroundColor: highlight,
    borderRadius: 20,
    width: width * 0.25,
    padding: pixel10,
  },
  logoutModalButtonText: {
    color: COLOR.WHITE,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: `${FONT}`,
    fontSize: pixel10*1.2,
  },
});
