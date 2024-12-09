import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const FriendsListStyles = StyleSheet.create({
  membersList: {
    width: width,
    backgroundColor: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBDB',
    width: '100%',
  },
});
