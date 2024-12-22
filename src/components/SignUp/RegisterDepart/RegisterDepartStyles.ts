import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const RegisterDepartStyles = StyleSheet.create({
  inputContainer: {
    marginTop: height * 0.02,
  },
  inputLabel: {
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '600',
    fontSize: 14,
    color: '#454545',
    marginBottom: height * 0.005,
  },
  starmark: {
    color: '#FF7360',
  },
  inputBox: {
    height: height * 0.06,
    minHeight: 50,
    backgroundColor: '#F4F4F4',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8, // 필요에 따라 추가
    justifyContent: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '600',
    fontSize: 12,
    color: '#000000',
    width: '100%',
  },
  placeholderText: {
    color: '#B9B9B9',
  },
  selectedText: {
    color: '#000000',
  },
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
  titleText: {
    fontSize: 24,
    color: '#3E3E3E',
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
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
    width: '100%',
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
    tintColor: '#009499',
  },
  labelStyle: {
    fontSize: 13,
    textAlign: 'left',
  },
  arrowStyle: {
    tintColor: '#009499',
  },

  confirmButton: {
    backgroundColor: '#009499',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 15,
    width: width * 0.2,
    alignSelf: 'center',
    zIndex: -1,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
