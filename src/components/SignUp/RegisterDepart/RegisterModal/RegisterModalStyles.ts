import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

export const RegisterModalStyles = StyleSheet.create({
  modalTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resetButton: {
    position: 'absolute',
    right: 5,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  clearIcon: {
    width: width * 0.04,
    height: height * 0.02,
    borderRadius: 10,
  },
  dropdownContainer: {
    flexDirection: 'row', // 두 드롭다운을 가로로 배치
    justifyContent: 'space-between',
    marginTop: 20,
  },

  titleText: {
    fontSize: 24,
    color: '#3E3E3E',
    fontWeight: 'bold',
    fontFamily: FONT,
    marginBottom: height * 0.01,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: COLOR.WHITE,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    maxHeight: 400,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
  },
  modalContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: width * 0.45,
    paddingRight: width * 0.02,
    position: 'relative',
  },

  dropDownStyle: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    borderWidth: 0,
  },
  dropDownContainerStyle: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
  },
  tickIconStyle: {
    width: 20,
    height: 20,
    tintColor: COLOR.MAIN,
  },
  labelStyle: {
    fontSize: 13,
    textAlign: 'left',
  },
  arrowStyle: {
    tintColor: COLOR.MAIN,
  },

  confirmButton: {
    backgroundColor: COLOR.MAIN,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 15,
    width: width * 0.2,
    alignSelf: 'center',
    zIndex: -1,
  },
  confirmButtonText: {
    color: COLOR.WHITE,
    fontSize: 12,
  },
});
