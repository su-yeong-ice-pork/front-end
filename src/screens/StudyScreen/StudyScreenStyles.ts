import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const StudyScreenStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height * 0.11,
    right: width * 0.03,
  },
  main: {
    paddingTop: 10,
    paddingBottom: height * 0.12,
    alignItems: 'center',
  },
});
