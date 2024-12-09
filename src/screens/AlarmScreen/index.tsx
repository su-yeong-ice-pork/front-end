import React from 'react';

import Header from '../../components/Header';
import BottomBar from '../../components/BottomBar/index';
import NotificationList from '../../components/AlarmScreenSection/NotificationList';

import {AlarmScreenStyles} from './AlramScreenStyles';
import {DummyNotification} from '../../constants/Alarm/Dummy';

import {
  ALARM_TYPE,
  NOTIFICATION_COMMENT,
} from '@/src/constants/Alarm/AlarmComment';

import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {ScrollView} from '@/components/ui/scroll-view';
import {SafeAreaView} from '@/components/ui/safe-area-view';

const AlarmScreen = () => {
  return (
    <SafeAreaView style={AlarmScreenStyles.safeContainer}>
      <Header Title={ALARM_TYPE.HEADER} />
      <Box style={AlarmScreenStyles.container}>
        <ScrollView contentContainerStyle={AlarmScreenStyles.contentContainer}>
          <Box style={AlarmScreenStyles.content}>
            <NotificationList
              title={ALARM_TYPE.TODAY}
              notifications={DummyNotification.filter(item => item.isToday)}
            />
            <NotificationList
              title={ALARM_TYPE.PREV}
              notifications={DummyNotification.filter(item => !item.isToday)}
            />
            <Text style={AlarmScreenStyles.footerText}>
              {NOTIFICATION_COMMENT.DEAD_LINE}
            </Text>
          </Box>
        </ScrollView>
      </Box>
      <BottomBar />
    </SafeAreaView>
  );
};

export default AlarmScreen;
