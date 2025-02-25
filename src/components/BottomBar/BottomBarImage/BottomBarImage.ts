import {PATH_NAME, IMAGE_PATH} from '@/src/constants/BottomBar/Images';
import {ScreenKey} from '../../types/BottomBarType/BottomBarType';

export const BottomBarImages = (
  currentScreen: string,
): Record<ScreenKey, string> => ({
  Log:
    currentScreen === PATH_NAME.LOG ? IMAGE_PATH.NOTE_ON : IMAGE_PATH.NOTE_OFF,
  Study:
    currentScreen === PATH_NAME.STUDY ||
    currentScreen === PATH_NAME.STUDY_DETAIL ||
    currentScreen === PATH_NAME.RANDOM_STUDY_DETAIL ||
    currentScreen === PATH_NAME.CREATE_STUDY
      ? IMAGE_PATH.STUDY_ON
      : IMAGE_PATH.STUDY_OFF,
  Home:
    currentScreen === PATH_NAME.HOME ? IMAGE_PATH.HOME_ON : IMAGE_PATH.HOME_OFF,
  Alarm:
    currentScreen === PATH_NAME.ALARM
      ? IMAGE_PATH.ALARM_ON
      : IMAGE_PATH.ALARM_OFF,
  Profile:
    currentScreen === PATH_NAME.PROFILE
      ? IMAGE_PATH.PROFILE_ON
      : IMAGE_PATH.PROFILE_OFF,
});
