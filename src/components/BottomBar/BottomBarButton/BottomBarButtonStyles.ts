import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color.ts';
import {GetLabelProps} from '../../types/BottomBarType/BottomBarType';
import {StyleSheet} from 'react-native';
import {PATH_NAME} from '@/src/constants/BottomBar/Images.ts';

export const BottomBarButtonStyles = StyleSheet.create({
  iconContainer: {
    padding: 6,
    backgroundColor: COLOR.WHITE,
    flexDirection: 'column',
    resizeMode: 'contain',
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 12,
    color: '#ABABAB',
    fontFamily: FONT,
    fontWeight: '700',
    resizeMode: 'contain',
  },
  labelActive: {
    fontSize: 12,
    color: COLOR.BLACK,
    fontFamily: FONT,
    fontWeight: 'bold',
    resizeMode: 'contain',
  },
});

export const getLabelStyle = ({ screen, currentScreen }: GetLabelProps) => {
  const isActive =
    (screen === 'Study' && (
      currentScreen === PATH_NAME.STUDY ||
      currentScreen === PATH_NAME.STUDY_DETAIL ||
      currentScreen === PATH_NAME.RANDOM_STUDY_DETAIL ||
      currentScreen === PATH_NAME.CREATE_STUDY
    )) ||
    (screen === 'Log' && currentScreen === PATH_NAME.LOG) ||
    (screen === 'Home' && currentScreen === PATH_NAME.HOME) ||
    (screen === 'Alarm' && currentScreen === PATH_NAME.ALARM) ||
    (screen === 'Profile' && currentScreen === PATH_NAME.PROFILE);

  return [
    BottomBarButtonStyles.label,
    isActive ? BottomBarButtonStyles.labelActive : null,
  ];
};
