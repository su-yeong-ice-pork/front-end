import {StyleSheet} from 'react-native-css-interop';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const ErrorMessageStyles = StyleSheet.create({
  iconAndTextContainer: {
    alignItems: 'center', // 이미지와 텍스트를 수직 중앙 정렬
    marginTop: height * 0.005,
  },
  setiIcon: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  activeText: {
    color: '#009499',
    fontSize: 11,
    fontFamily: 'NanumSquareNeo-Variable',
  },
});

export default ErrorMessageStyles;
