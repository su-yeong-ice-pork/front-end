import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import NotificationList from '../components/NotificationList';
import {NotificationData} from '../components/types/NotificationData';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar/index';

const {width} = Dimensions.get('window');
const todayNotifications: NotificationData[] = [
  {
    imageUrl: 'smile',
    content: '너무 잘해서 나도 웃음이 멈추질 않네! 😆',
    sender: '이서현',
    time: '오늘 오전 10:10',
    type: 'emoji',
  },
  {
    imageUrl: 'comment',
    content: '힘내!',
    sender: '김진우',
    time: '오늘 오전 10:02',
    type: 'text',
  },
  {
    imageUrl: 'comment',
    sender: '유경미',
    content: '힘내!',
    time: '오늘 오전 08:17',
    type: 'text',
  },
];

const previousNotifications: NotificationData[] = [
  {
    imageUrl: 'sweat',
    content: '아, 좀 어렵네... 그래도 끝까지 파이팅! 😅',
    sender: '고민석',
    time: '9월 13일',
    type: 'emoji',
  },
  {
    imageUrl: 'comment',
    content: '힘내!',
    sender: '김태영',
    time: '9월 11일',
    type: 'text',
  },
  {
    imageUrl: 'comment',
    sender: '유경미',
    content: '힘내!',
    time: '9월 10일',
    type: 'text',
  },
];

const AlarmScreen = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header Title={'알림'} />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.content}>
              <NotificationList
                title="오늘 받은 알림"
                notifications={todayNotifications}
              />
              <NotificationList
                title="이전 알림"
                notifications={previousNotifications}
              />
              <Text style={styles.footerText}>
                알림은 30일 이후 자동삭제됩니다.
              </Text>
            </View>
          </ScrollView>
        </View>
        <BottomBar />
      </SafeAreaView>
    </>
  );
};

export default AlarmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#e4e4e7', // bg-neutral-100
  },
  contentContainer: {
    paddingBottom: 80, // Height of the BottomBar to prevent overlap
  },
  content: {
    width: '100%',
    maxWidth: 480,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  footerText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 12,
    fontWeight: '700',
    color: '#737373',
    fontFamily: 'NanumSquareNeo-Variable',
  },
});
