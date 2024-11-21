import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const AuthButtonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.05,
  },
});
