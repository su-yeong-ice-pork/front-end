import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const StudyGroupSectionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E6E8',
    alignItems: 'center',
  },
  main: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height*0.07,
    right: width*0.03,
  },
});
