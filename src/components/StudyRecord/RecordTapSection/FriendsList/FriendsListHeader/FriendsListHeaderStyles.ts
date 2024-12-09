import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';
import {StyleSheet} from 'react-native';

export const FriendsListHeaderStyles = StyleSheet.create({
  membersHeader: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
    alignSelf: 'center',
  },
  membersTitle: {
    fontSize: 16,
    color: '#454545',
    fontWeight: '900',
    fontFamily: `${FONT}`,
  },
  addMemberButton: {
    backgroundColor: '#1AA5AA',
    width: 100,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addMemberButtonText: {
    color: `${COLOR.WHITE}`,
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '900',
    fontFamily: `${FONT}`,
  },
  redStar: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
});
