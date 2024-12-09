import {StyleSheet} from 'react-native';

export const LandingScreenStyles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboardAwareScrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  keyboardAwareScrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});
