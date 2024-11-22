import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import BottomBar from '../components/BottomBar/index';
import CalendarScreen from '../components/calendar';
import Sticker from '../components/CheerupSticker';
import CheerupWords from '../components/CheerupWords';
import CheerupText from '../components/CheerupText';
const {width, height} = Dimensions.get('window');

const FriendsProfile = () => {
  const IMAGES = {
    profile: require('../../assets/images/illustration/typeThree.png'),
    logo: require('../../assets/images/illustration/logo.png'),
    badge1: require('../../assets/images/badge/badge1.png'),
    badge2: require('../../assets/images/badge/badge2.png'),
    badge3: require('../../assets/images/badge/badge3.png'),
    leaveFriends: require('../../assets/images/icons/leaveFriend.png'),
    moreIcon: require('../../assets/images/icons/moreIcon2.png'),
  };

  const profiles = [
    {
      id: 1,
      name: '김태영',
      nickName: '새도의 신',
      image: null,
      badge: [
        {image: IMAGES.badge1},
        {image: IMAGES.badge2},
        {image: IMAGES.badge3},
      ],
      message: '기말고사 힘들다..',
    },
  ];

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: 80}}>
          <View style={styles.logoSection}>
            <View style={styles.logoInfo}>
              <Image source={IMAGES.logo} style={styles.logoImage} />
            </View>
          </View>

          {profiles.map(profile => (
            <View key={profile.id}>
              <View style={styles.upperSection}>
                <View style={styles.profileInfo}>
                  <Image
                    source={
                      profile.image ? {uri: profile.image} : IMAGES.profile
                    }
                    style={styles.profileImage}
                  />
                </View>
              </View>

              <View style={styles.profileTextContainer}>
                <Text style={styles.nickname}>{profile.nickName}</Text>
                <Text style={styles.username}>{profile.name}</Text>

                {/* 친구 떠나기 버튼 */}
                <View style={styles.leaveButtonContainer}>
                  <TouchableOpacity style={styles.leaveButton}>
                    <Image
                      source={IMAGES.leaveFriends}
                      style={styles.leaveIcon}
                    />
                    <Text style={styles.leaveButtonText}>친구 떠나기</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* 친구의 한마디 Section */}
              <View style={styles.friendMessageSection}>
                <Text style={styles.sectionTitle}>친구의 한마디</Text>
                <View style={styles.friendMessageButton}>
                  <Text style={styles.friendMessageText}>
                    {profile.message}
                  </Text>
                </View>
              </View>

              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>보유 뱃지</Text>
                <View style={styles.badges}>
                  {profile.badge.map((badge, index) => (
                    <Image
                      key={index}
                      source={badge.image}
                      style={styles.badge}
                    />
                  ))}

                  <TouchableOpacity style={styles.moreButton}>
                    <Image style={styles.moreImage} source={IMAGES.moreIcon} />
                    <Text style={styles.moreText}>더보기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {/* 응원스티커 Section */}
          <Sticker />

          {/* 응원문구 Section */}
          <CheerupWords />

          {/* 응원텍스트 Section */}
          <CheerupText />

          {/* 현재 일수 표시 */}
          <View style={styles.currentDaySection}>
            <Text style={styles.currentDayText}>
              현재 <Text style={styles.dayCount}>43</Text>일 째!
            </Text>
          </View>

          {/* 달력 부분 */}
          <View style={styles.calendarContainer}>
            <CalendarScreen />
          </View>
        </ScrollView>
        <BottomBar />
      </SafeAreaView>
    </>
  );
};

export default FriendsProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  logoSection: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: height * 0.02, // 추가된 패딩
  },
  logoInfo: {
    flexDirection: 'row',
  },
  logoImage: {
    width: width * 0.2, // 20% of screen width
    height: height * 0.06, // 6% of screen height
    left: width * 0.05, // 5% of screen width
    resizeMode: 'contain',
  },
  upperSection: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    padding: height * 0.06, // 6% of screen height
    backgroundColor: '#86C0AE',
  },
  profileInfo: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    left: width * 0.07, // 7% of screen width
  },
  profileImage: {
    width: width * 0.22, // 25% of screen width
    height: width * 0.22, // 25% of screen width to keep it square
    marginTop: height * 0.05, // 3% of screen height
    left: width * 0.02, // 2% of screen width
    borderRadius: (width * 0.25) / 2, // Make it circular
  },
  profileTextContainer: {
    marginLeft: width * 0.04, // 4% of screen width
    marginTop: height * 0.03, // 3% of screen height
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: '#009499',
    marginLeft: width * 0.025, // 2.5% of screen width
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '900',
  },
  username: {
    fontSize: width * 0.05, // 5% of screen width
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '900',
    color: '#333',
    marginLeft: width * 0.025, // 2.5% of screen width
    marginTop: -height * 0.005, // -1.5% of screen height
  },
  badgeContainer: {
    padding: height * 0.025, // 2.5% of screen height
    alignItems: 'center',
  },
  badges: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: width * 0.025, // 2.5% of screen width
    borderRadius: width * 0.015, // 1.5% of screen width
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: width * 0.035,
    marginLeft: width * 0.015, // 1.5% of screen width
    fontFamily: 'NanumSquareNeo-Variable',
    color: '#838F8F',
    marginBottom: height * 0.003, // 0.3% of screen height
    alignSelf: 'flex-start',
  },
  badge: {
    width: width * 0.09, // 9% of screen width
    height: width * 0.09, // 9% of screen width to keep it square
    marginRight: width * 0.02, // 2% of screen width
    resizeMode: 'contain',
  },
  moreButton: {
    color: '#009499',
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 12, // text-xs
    fontWeight: '800', // font-extrabold
    color: '#0D9488', // text-teal-600
    marginLeft: 5,
    fontFamily: 'NanumSquareNeo-Variable',
  },
  moreImage: {
    marginTop: 8,
    marginLeft: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  friendMessageSection: {
    marginTop: height * 0.025, // 2.5% of screen height
    paddingVertical: height * 0.01, // 1% of screen height
    paddingHorizontal: width * 0.04, // 4% of screen width
    borderRadius: width * 0.02, // 2% of screen width
    marginLeft: width * 0.01, // 2.5% of screen width
    position: 'relative',
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: width * 0.035,
    marginLeft: width * 0.01, // 1.2% of screen width
    color: '#838F8F',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  friendMessageButton: {
    backgroundColor: '#5AA6A8',
    paddingVertical: height * 0.008, // 0.8% of screen height
    paddingHorizontal: width * 0.03, // 3% of screen width
    borderRadius: width * 0.015, // 1.5% of screen width
    borderBottomLeftRadius: 0,
    marginTop: height * 0.012, // 1.2% of screen height
    alignSelf: 'flex-start',
  },
  friendMessageText: {
    color: '#FFFFFF',
    fontSize: width * 0.04, // 4% of screen width
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
  },
  leaveButtonContainer: {
    position: 'absolute',
    right: width * 0.05,
    marginTop: height * 0.02,
  },
  leaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FF6F61',
    paddingVertical: height * 0.015, // 1.5% of screen height
    paddingHorizontal: width * 0.04, // 4% of screen width
    borderRadius: width * 0.0375, // 3.75% of screen width
    marginLeft: width * 0.35, // 35% of screen width
    marginTop: -height * 0.03, // -3% of screen height
    borderWidth: width * 0.003, // 0.3% of screen width
  },
  leaveButtonText: {
    color: '#FF6F61',
    fontWeight: '800',
    marginLeft: width * 0.012, // 1.2% of screen width
    fontFamily: 'NanumSquareNeo-Variable',
  },
  leaveIcon: {
    width: width * 0.04, // 4% of screen width
    height: width * 0.04, // 4% of screen width
  },
  infoText: {
    fontSize: width * 0.025, // 2.5% of screen width
    color: '#009499',
    marginTop: height * 0.012, // 1.2% of screen height
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
  },
  currentDaySection: {
    padding: height * 0.025, // 2.5% of screen height
    alignItems: 'flex-start',
  },
  dayCount: {
    fontSize: width * 0.06, // 6% of screen width
    color: '#009499',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '900',
  },
  currentDayText: {
    fontSize: width * 0.04, // 4% of screen width
    color: '#333',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '900',
  },
  calendarContainer: {
    marginTop: height * 0.025, // 2.5% of screen height
    paddingHorizontal: width * 0.04, // 4% of screen width
  },
  // 추가적인 스타일 변경 사항
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.002, // 0.2% of screen height
  },
  setiIcon: {
    width: width * 0.03, // 3% of screen width
    height: width * 0.03, // 3% of screen width
    resizeMode: 'contain',
    marginRight: width * 0.015, // 1.5% of screen width
  },
  activeText: {
    fontFamily: 'NanumSquareNeo-aLt',
    color: '#009499',
    fontSize: width * 0.03, // 3% of screen width
  },
  successMessage: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: '#28a745',
    fontFamily: 'NanumSquareNeo-Variable',
    fontWeight: '700',
    marginTop: height * 0.01, // 1% of screen height
  },
});
