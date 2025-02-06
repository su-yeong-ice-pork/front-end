import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const CreateStudyButtonStyles = StyleSheet.create({
  button:{
    height: width*0.16,
    width: width*0.16,
  },
});
