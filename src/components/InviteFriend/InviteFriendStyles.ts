import {StyleSheet, Dimensions} from 'react-native';
import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color';

const {width} = Dimensions.get('window');

export const InviteFriendStyles = StyleSheet.create({
  ModalHeader: {
    backgroundColor: 'white',
    padding: 6,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 6,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: `${FONT}`,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00838F',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: width * 0.03,
  },
  closeButton: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
  },
  modalBody: {
    backgroundColor: '#F1F1F1',
    padding: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DADADA',
    padding: 5,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
  },
  inputField: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5E5E5E',
    padding: 5,
  },
  copyButton: {
    backgroundColor: `${COLOR.MAIN}`,
    position: 'absolute',
    right: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  copyButtonText: {
    fontFamily: `${FONT}`,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputTitle: {
    paddingBottom: 10,
  },
});
