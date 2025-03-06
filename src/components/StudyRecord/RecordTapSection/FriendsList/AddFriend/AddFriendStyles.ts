import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';
import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const AddFriendStyles = StyleSheet.create({
  modalContent: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#E1E6E8',
  },
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#E1E6E8',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: FONT,
    color: COLOR.MAIN,
  },
  clickIcon: {
    width: width * 0.05,
    height: width * 0.05,
    marginRight: 10,
    resizeMode: 'contain',
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
  buttonContainer: {
    width: width * 0.05,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
  },
  modalBody: {
    backgroundColor: '#E1E6E8',
    paddingTop: 15,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.MAIN,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONT,
    color: '#323232',
  },
  friendList: {
    paddingTop: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendListText: {
    fontFamily: FONT,
    color: '#323232',
  },
  friendListContainer: {
    width: '100%',
    height: 45,
    paddingLeft: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  emojiIcon: {
    width: width * 0.05,
    height: width * 0.05,
    marginLeft: 5,
    opacity: 0.5,
  },
});
