import {StyleSheet, Dimensions} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

const {width} = Dimensions.get('window');

export const DailyStudyModalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: width * 0.9,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  headerText: {
    fontFamily: FONT,
    fontSize: 17,
    fontWeight: '800',
    color: '#636363',
  },
  pencilIcon: {
    width: 18,
    height: 18,
    paddingLeft: 10,
    resizeMode: 'contain',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'transparent',
  },
  closeButton: {
    width: width * 0.05,
    height: width * 0.05,
  },
  modalBody: {
    flexDirection: 'column',
    backgroundColor: '#EDEDED',
    width: width * 0.9,
    minHeight: width * 0.32,
    padding: 15,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  joinButton: {
    zIndex: -1,
    alignSelf: 'center',
    width: width * 0.4,
    height: 40,
    backgroundColor: COLOR.MAIN,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 8,
  },
});
