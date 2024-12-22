import React from 'react';
import {Image} from 'react-native';
import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import {CutomDayStyles} from './customDayStyles';
import moment from 'moment';
import {ICONS} from '@/src/constants/image/icons';
import {JANDILEVEL} from '@/src/constants/Calendar/JandiLevel';
import {MonthCalendarProps} from '../../types/CalendarType/MonthCalendarType';

const CustomDay: React.FC<MonthCalendarProps> = ({
  date,
  state,
  grassData,
  onDayPress,
}) => {
  const isSelected = state === 'selected';
  const isToday = moment(date.dateString).isSame(moment(), 'day');
  const studyData = grassData[date.dateString];
  const studyTime = studyData ? studyData.studyTime : 0;
  const grassScore = studyData ? studyData.grassScore : 0;
  const getJandiImage = (studyHour: number, grassScore: number) => {
    if (
      grassScore >= JANDILEVEL.JANDI_LEVEL_HIGH &&
      studyHour === JANDILEVEL.JANDI_LEVEL_LOW
    )
      return ICONS.JANDI_IMG;
    else if (
      studyHour === JANDILEVEL.JANDI_LEVEL_LOW ||
      grassScore < JANDILEVEL.JANDI_LEVEL_HIGH
    )
      return null;
    else if (studyHour >= 1 && studyHour <= 2) return ICONS.JANDI_IMG1;
    else if (studyHour >= 3 && studyHour <= 4) return ICONS.JANDI_IMG2;
    else if (studyHour >= 5 && studyHour <= 6) return ICONS.JANDI_IMG3;
    else if (studyHour >= 7 && studyHour <= 8) return ICONS.JANDI_IMG4;
    else return ICONS.JANDI_IMG4;
  };

  const jandiImage = getJandiImage(studyTime, grassScore);

  return (
    <Button
      style={[
        CutomDayStyles.dayContainer,
        isSelected && CutomDayStyles.selectedDay,
        !jandiImage && CutomDayStyles.defaultDayContainer,
      ]}
      onPress={() => onDayPress(date)}
      disabled={state === 'disabled'}>
      {jandiImage && (
        <Image source={jandiImage} style={CutomDayStyles.dayImage} />
      )}
      <Text
        style={[CutomDayStyles.dayText, isToday && CutomDayStyles.todayText]}>
        {date.day}
      </Text>
    </Button>
  );
};

export default CustomDay;
