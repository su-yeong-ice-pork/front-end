import {Dimensions, StyleSheet} from 'react-native';
import {COLOR} from '@/src/constants/styles/color/color';
import {FONT} from '@/src/constants/styles/font/default-font';

const {height} = Dimensions.get('window');
export const StudyLeaveButtonStyles = StyleSheet.create({
  leftAction: {
    width: 95,
    height: '100%',
    backgroundColor: '#FB5858',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: `${COLOR.BLACK}`,
    shadowOffset: {width: -4, height: 0},
    shadowOpacity: 0.19,
    shadowRadius: 11.4,
    elevation: 5,
  },
  actionIcon: {
    width: 19,
    height: 24,
    marginBottom: height * 0.013,
  },
  actionText: {
    position: 'absolute',
    bottom: -15,
    width: 79,
    color: `${COLOR.WHITE}`,
    fontFamily: `${FONT}`,
    fontSize: 9,
    lineHeight: 70,
    textAlign: 'center',
  },
});
