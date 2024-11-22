import {PATH_NAME} from '@/src/constants/BottomBar/Images';

export type GetLabelProps = {
  currentScreen: string;
  screen: string;
};
export type BottomBarButtonType = {
  currentScreen: string;
  screen: ScreenKey | string;
  label: string;
  onPress: () => void;
};
export type ScreenKey = 'Log' | 'Study' | 'Home' | 'Alarm' | 'Profile';
export type PathNameType = (typeof PATH_NAME)[keyof typeof PATH_NAME];
