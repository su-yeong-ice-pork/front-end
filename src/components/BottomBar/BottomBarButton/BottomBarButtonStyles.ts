import {FONT} from '@/src/constants/styles/font/default-font';
import {COLOR} from '@/src/constants/styles/color/color.ts';
import {GetLabelProps} from '../../types/BottomBarType/BottomBarType';
import {StyleSheet} from 'react-native';

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

export const getLabelStyle = ({screen, currentScreen}: GetLabelProps) => {
  return [
    BottomBarButtonStyles.label,
    currentScreen === screen && BottomBarButtonStyles.labelActive,
  ];
};
