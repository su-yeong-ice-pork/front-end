import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const ProfilCardSectionStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
  },
  profileCardContainer: {
    width: width - 40,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignSelf: 'center',
  },
});
