import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';
export const SuccessModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: width * 0.8,
    maxHeight: height * 0.6,
    backgroundColor: COLOR.WHITE,
    borderRadius: 8,
    padding: width * 0.05,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: height * 0.02,
    textAlign: 'left',
    fontSize: width * 0.04,
    fontWeight: '700',
    fontFamily: `${FONT}`,
    color: COLOR.WHITE,
  },
  buttonClose: {
    backgroundColor: '#1AA5AA',
    borderRadius: 4,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
  },
  textStyle2: {
    color: COLOR.WHITE,
    fontWeight: 'bold',
    fontSize: width * 0.035,
    marginBottom: 5,
  },
});
