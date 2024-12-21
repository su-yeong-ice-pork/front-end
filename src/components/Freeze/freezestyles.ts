import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const FreezeStyles = StyleSheet.create({
  frozenSection: {
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
    borderStyle: 'solid', //test
    borderColor: 'blue',
    borderWidth: 1,
  },
});
