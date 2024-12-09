import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const StudyMemberListStyles = StyleSheet.create({
  membersList: {
    width: width,
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBDB',
    width: '100%',
  },
});
