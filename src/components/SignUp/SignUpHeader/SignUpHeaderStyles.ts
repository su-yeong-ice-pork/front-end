import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SignUpHeaderStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.3, // Increased to ensure space for the button
  },
  welcomeText: {
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '800',
    fontSize: 24,
    color: '#3E3E3E',
    paddingTop: height * 0.02,
  },
  inlineText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
  },
  codeButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#009499',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
