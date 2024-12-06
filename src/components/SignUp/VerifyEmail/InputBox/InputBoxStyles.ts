import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native-css-interop';

const {height} = Dimensions.get('window');

export const InputBoxStyles = StyleSheet.create({
  inputLabel: {
    color: '#454545',
    marginBottom: height * 0.005,
  },
  starmark: {
    color: '#FF7360',
  },
  inputBox: {
    height: height * 0.06,
    backgroundColor: '#F4F4F4',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
    fontSize: 12,
    color: '#000000',
    width: '100%',
  },
  placeholderText: {
    color: '#B9B9B9',
  },
});
