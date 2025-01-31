import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SignUpScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E6E8',
  },
  formContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.3,
    backgroundColor: '#E1E6E8',
  },
  inputContainer: {
    marginTop: height * 0.02,
  },
});
