// /src/components/MonthCalendar/CalendarTabs.tsx
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import LinearGradient from 'react-native-linear-gradient';
import {MonthCalendarStyles} from './monthCalendarStyles';

interface CalendarTabsProps {
  viewMode: 'monthly' | 'yearly';
  onTabPress: (mode: 'monthly' | 'yearly') => void;
}

const CalendarTabs: React.FC<CalendarTabsProps> = ({viewMode, onTabPress}) => {
  return (
    <Box style={MonthCalendarStyles.tabContainer}>
      <TouchableOpacity
        style={MonthCalendarStyles.tabButton}
        onPress={() => onTabPress('monthly')}
        activeOpacity={0.7}>
        <Box style={MonthCalendarStyles.tabContent}>
          {viewMode === 'monthly' && (
            <LinearGradient
              colors={['#0DD8EC', '#15EC89']}
              style={MonthCalendarStyles.activeIndicator}>
              <LinearGradient
                colors={['#0DD8EC', '#15EC89']}
                style={MonthCalendarStyles.dot}
              />
            </LinearGradient>
          )}
          <Text
            style={
              viewMode === 'monthly'
                ? MonthCalendarStyles.activeTabText
                : MonthCalendarStyles.tabText
            }>
            월간 잔디밭
          </Text>
        </Box>
      </TouchableOpacity>

      <TouchableOpacity
        style={MonthCalendarStyles.tabButton}
        onPress={() => onTabPress('yearly')}>
        <Box style={MonthCalendarStyles.tabContent}>
          {viewMode === 'yearly' && (
            <LinearGradient
              colors={['#0DD8EC', '#15EC89']}
              style={MonthCalendarStyles.activeIndicator}>
              <LinearGradient
                colors={['#0DD8EC', '#15EC89']}
                style={MonthCalendarStyles.dot}
              />
            </LinearGradient>
          )}
          <Text
            style={
              viewMode === 'yearly'
                ? MonthCalendarStyles.activeTabText
                : MonthCalendarStyles.tabText
            }>
            연간 잔디밭
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default CalendarTabs;
