// src/screens/StudyDetailScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar/index';
import DashLine from '../components/DashLine';

const {width} = Dimensions.get('window');

// 더미 데이터
const members = [
  {
    id: 1,
    name: '고민석',
    todayStudyTime: '03시간 10분',
    image: null, // 이미지 없을 경우 기본 이미지 사용
    isHost: true,
  },
  {
    id: 2,
    name: '김진우',
    todayStudyTime: '03시간 34분',
    image: null,
    isHost: false,
  },
  {
    id: 3,
    name: '이서현',
    todayStudyTime: '02시간 33분',
    image: null,
    isHost: false,
  },
  {
    id: 4,
    name: '김태영',
    todayStudyTime: '04시간 06분',
    image: null,
    isHost: false,
  },
  {
    id: 5,
    name: '유경미',
    todayStudyTime: '03시간 49분',
    image: null,
    isHost: false,
  },
];

const StudyDetailScreen = () => {
  const totalStudyTime = 72;

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Header Title={'스터디'} />
          <ScrollView contentContainerStyle={styles.main}>
            {/* 스터디 이름과 함께 인증하기 버튼 */}
            <View style={styles.studyHeader}>
              <View style={styles.studyInfo}>
                <Text style={styles.studyTitle}>CPA 메이트</Text>
                <Text style={styles.totalStudyTime}>
                  총 공부시간:{'  '}
                  <Text style={styles.totalStudyTimeValue}>
                    {totalStudyTime}
                  </Text>
                  시간
                </Text>
              </View>
              <TouchableOpacity
                style={styles.certifyButton}
                onPress={() => {
                  /* 인증하기 기능 */
                }}>
                <Image
                  source={require('../../assets/images/icons/redstar.png')}
                  style={styles.redStar}
                  resizeMode="contain"
                />
                <Text style={styles.certifyButtonText}>함께 인증하기</Text>
              </TouchableOpacity>
            </View>

            {/* 점선 */}
            <DashLine />

            {/* 구성원 목록과 구성원 추가 버튼 */}
            <View style={styles.membersHeader}>
              <Text style={styles.membersTitle}>구성원 목록</Text>
              <TouchableOpacity
                style={styles.addMemberButton}
                onPress={() => {
                  /* 구성원 추가 기능 */
                }}>
                <Image
                  source={require('../../assets/images/icons/whiteUsers.png')}
                  style={styles.redStar}
                  resizeMode="contain"
                />
                <Text style={styles.addMemberButtonText}>구성원 추가</Text>
              </TouchableOpacity>
            </View>

            {/* 구성원 리스트 */}
            <View style={styles.membersList}>
              {members.map((member, index) => (
                <View key={member.id}>
                  <TouchableOpacity
                    style={styles.memberItem}
                    onPress={() => {
                      /* 구성원 터치 기능 */
                    }}>
                    <Image
                      source={
                        member.image
                          ? {uri: member.image}
                          : require('../../assets/images/icons/baseIcon.png')
                      }
                      style={styles.memberImage}
                      resizeMode="cover"
                    />
                    <View style={styles.memberInfo}>
                      <Text style={styles.memberName}>
                        {member.name}{' '}
                        {member.isHost && (
                          <View style={styles.hostBadge}>
                            <Image
                              source={require('../../assets/images/icons/crown.png')}
                              style={styles.crown}
                              resizeMode="contain"
                            />
                            <Text style={styles.hostBadgeText}>방장</Text>
                          </View>
                        )}
                      </Text>
                      <Text style={styles.memberStudyTime}>
                        오늘 공부 시간:{' '}
                        <Text style={styles.totalStudyTimeValue}>
                          {member.todayStudyTime}
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {index !== members.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <BottomBar />
    </>
  );
};

export default StudyDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  main: {
    paddingHorizontal: 20,
    alignItems: 'center',
    width: width,
    paddingBottom: 80,
  },
  // 스터디 이름과 인증하기 버튼 컨테이너
  studyHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    // 고정 높이 설정으로 버튼과 텍스트가 겹치지 않도록 조정
    height: 80,
  },
  studyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  studyTitle: {
    fontSize: 27,
    fontWeight: '900',
    color: '#454545',
    fontFamily: 'NanumSquareNeo-Variable',
    marginBottom: 5,
    width: '100%',
  },
  totalStudyTime: {
    fontSize: 14,
    color: '#454545',
    fontWeight: '700',
    fontFamily: 'NanumSquareNeo-Variable',
    width: '100%',
  },
  certifyButton: {
    backgroundColor: '#1AA5AA',
    width: 157,
    height: 50,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  certifyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  redStar: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  crown: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  // 점선
  dashedLine: {
    width: '100%',
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#DBDBDB',
    marginBottom: 20,
  },
  // 구성원 목록 헤더
  membersHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  membersTitle: {
    fontSize: 16,
    color: '#454545',
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  addMemberButton: {
    backgroundColor: '#1AA5AA',
    width: 120,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addMemberButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  // 구성원 리스트
  membersList: {
    width: width,
  },
  memberItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20, // Increased vertical padding
    paddingLeft: 20, // Added left padding
    backgroundColor: '#FFFFFF',
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E1E6E8',
    marginRight: 10,
  },
  memberInfo: {
    flex: 1,
  },
  totalStudyTimeValue: {
    color: '#009499',
  },
  memberName: {
    fontSize: 18,
    color: '#454545',
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
    marginBottom: 5,
    width: '100%',
  },
  hostBadgeText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
  },
  memberStudyTime: {
    fontSize: 14,
    color: '#646464',
    fontWeight: '900',
    fontFamily: 'NanumSquareNeo-Variable',
    width: '100%',
  },
  hostBadge: {
    backgroundColor: 'rgba(92, 92, 92, 0.85)',
    borderRadius: 10.5,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBDB',
    width: '100%',
  },
});
