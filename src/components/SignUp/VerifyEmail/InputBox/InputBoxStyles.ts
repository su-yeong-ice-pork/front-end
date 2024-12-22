import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native-css-interop';

const {width, height} = Dimensions.get('window');

export const InputBoxStyles = StyleSheet.create({
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
    width: '100%',
    minHeight: 50,
    backgroundColor: '#F4F4F4',
    borderRadius: 6,
    paddingVertical: 5,
    justifyContent: 'center',
    fontFamily: 'NanumSquareNeo-Variable',
    fontSize: 12,
    color: '#000000',
  },
  placeholderText: {
    color: '#B9B9B9',
  },
});
