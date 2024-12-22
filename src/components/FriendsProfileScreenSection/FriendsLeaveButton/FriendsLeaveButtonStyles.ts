import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {FONT} from '@/src/constants/styles/font/default-font';

export const FriendsLeaveButtonStyles = StyleSheet.create({
  leaveButtonContainer: {
    position: 'absolute',
    right: width * 0.05,
  },
  leaveButton: {
    marginTop: -50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FF6F61',
    backgroundColor: 'white',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.0375,
    marginLeft: width * 0.35,
    borderWidth: width * 0.003,
  },
  leaveButtonText: {
    color: '#FF6F61',
    fontWeight: '700',
    marginLeft: width * 0.012,
    fontFamily: `${FONT}`,
    fontSize: 10,
  },
  leaveIcon: {
    width: width * 0.04,
    height: width * 0.04,
  },
});
