import React, {useState, useEffect} from 'react';
import {Box, HStack} from '@/components/ui';
import DropDownPicker from 'react-native-dropdown-picker';
import {timeData} from '@/src/constants/timeData';
import {SelectDateStyles} from './SelectDateStyles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SET_DATE} from '@/src/constants/DailyStudyModal/DailyStudyModal';
import {SelectDateProps} from '../../types/DailyStudyModalType/DailyStudyModal';

const SelectDate: React.FC<SelectDateProps> = ({
  setAttendanceDate,
  setAttendanceTime,
}) => {
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);
  const [isHourOpen, setIsHourOpen] = useState<boolean>(false);
  const [isMinuteOpen, setIsMinuteOpen] = useState<boolean>(false);

  const [hour, setHour] = useState<string>(timeData[0].hour);
  const [minute, setMinute] = useState<string>(timeData[0].minute[0]);
  const [availableMinutes, setAvailableMinutes] = useState<string[]>(
    timeData[0].minute,
  );

  useEffect(() => {
    const selectedTime = timeData.find(time => time.hour === hour);
    if (selectedTime) {
      setAvailableMinutes(selectedTime.minute);
      setMinute(selectedTime.minute[0]);
    }
  }, [hour]);

  const dates = [];
  const currentDate = new Date();
  const endDate = new Date();
  endDate.setDate(currentDate.getDate() + 6);

  while (currentDate <= endDate) {
    currentDate.setDate(currentDate.getDate() + 1);
    dates.push({
      date: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    });
  }

  const [date, setDate] = useState<string>(
    `${dates[0].year}-${String(dates[0].month).padStart(2, '0')}-${String(
      dates[0].date,
    ).padStart(2, '0')}`,
  );

  useEffect(() => {
    setAttendanceDate(date);
  }, [date]);

  useEffect(() => {
    const formattedTime = `${hour}:${minute}`;
    setAttendanceTime(formattedTime);
  }, [hour, minute]);

  return (
    <Box style={SelectDateStyles.box}>
      <GestureHandlerRootView>
        <HStack style={SelectDateStyles.container}>
          <Box style={SelectDateStyles.dateBox}>
            <DropDownPicker
              open={isDateOpen}
              value={date}
              items={dates.map(day => ({
                label: `${day.date}` + `${SET_DATE.DATE_LABEL}`,
                value: `${day.year}-${String(day.month).padStart(
                  2,
                  '0',
                )}-${String(day.date).padStart(2, '0')}`,
              }))}
              listMode={SET_DATE.LISTMODE}
              setOpen={setIsDateOpen}
              setValue={setDate}
              style={SelectDateStyles.dropDownStyle}
              dropDownContainerStyle={SelectDateStyles.dropDownContainerStyle}
              selectedItemContainerStyle={
                SelectDateStyles.selectedItemContainerStyle
              }
              selectedItemLabelStyle={SelectDateStyles.selectedItemLabelStyle}
              disable={!hour && !minute}
              onOpen={() => {
                setIsHourOpen(false);
                setIsMinuteOpen(false);
              }}
            />
          </Box>

          <Box style={SelectDateStyles.hourBox}>
            <Box>
              <DropDownPicker
                open={isHourOpen}
                value={hour}
                items={timeData.map(time => ({
                  label: `${time.hour}`,
                  value: time.hour,
                }))}
                listMode={SET_DATE.LISTMODE}
                setOpen={setIsHourOpen}
                setValue={setHour}
                style={SelectDateStyles.dropDownStyle}
                dropDownContainerStyle={SelectDateStyles.dropDownContainerStyle}
                selectedItemContainerStyle={
                  SelectDateStyles.selectedItemContainerStyle
                }
                selectedItemLabelStyle={SelectDateStyles.selectedItemLabelStyle}
                disabled={!minute}
                onOpen={() => {
                  setIsDateOpen(false);
                  setIsMinuteOpen(false);
                }}
              />
            </Box>
          </Box>

          <Box style={SelectDateStyles.minuteBox}>
            <DropDownPicker
              open={isMinuteOpen}
              value={minute}
              items={availableMinutes.map(min => ({
                label: `${min}`,
                value: min,
              }))}
              listMode={SET_DATE.LISTMODE}
              setOpen={setIsMinuteOpen}
              setValue={setMinute}
              style={SelectDateStyles.dropDownStyle}
              dropDownContainerStyle={SelectDateStyles.dropDownContainerStyle}
              selectedItemContainerStyle={
                SelectDateStyles.selectedItemContainerStyle
              }
              selectedItemLabelStyle={SelectDateStyles.selectedItemLabelStyle}
              onOpen={() => {
                setIsDateOpen(false);
                setIsHourOpen(false);
              }}
            />
          </Box>
        </HStack>
      </GestureHandlerRootView>
    </Box>
  );
};

export default SelectDate;
