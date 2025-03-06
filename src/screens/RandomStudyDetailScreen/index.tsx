import React from 'react';

import BottomBar from '../../components/BottomBar/index';
import Header from '../../components/Header';

import {RandomStudyDetailScreenStyles} from './RandomStudyDetailScreenStyles';
import {SafeAreaView} from '@/components/ui/safe-area-view';
import {useRoute} from '@react-navigation/native';
import {StudyDetailScreenRouteProp} from '@/src/components/types/StudyDetailType/StudyDetailType.ts';
import {STUDY_DETAIL} from '@/src/constants/StudyDetail/studyDetail.ts';
import {ScrollView} from 'react-native';

import RandomStudyDetailHeader from '@/src/components/RandomStudyDetail/StudyDetailHeader';
import RandomStudyMemberList from '@/src/components/RandomStudyDetail/RandomMemberList';

// GET: /random-studies API 연결 필요
const studyDetail = {
  id: 1,
  studyName: '아침 9시 스터디',
  memberCount: 6,
  attendanceTime: '오전 9시',
  totalStudyTime: 10,
};

// GET: /random-studies/{studyId}/participants API 연결 필요
const randomStudyMember = [
  {
    memberId: 1,
    name: '김민수',
    profileImage: 'https://example.com/profile1.jpg', // 프로필 이미지 링크
    todayStudyTime: '2시간 30분', // 오늘 총 공부시간
  },
  {
    memberId: 2,
    name: '이영희',
    profileImage: 'https://example.com/profile2.jpg', // 프로필 이미지 링크
    todayStudyTime: '1시간 45분', // 오늘 총 공부시간
  },
  {
    memberId: 3,
    name: '박지훈',
    profileImage: 'https://example.com/profile3.jpg', // 프로필 이미지 링크
    todayStudyTime: '3시간 15분', // 오늘 총 공부시간
  },
  {
    memberId: 4,
    name: '최수진',
    profileImage: 'https://example.com/profile4.jpg', // 프로필 이미지 링크
    todayStudyTime: '0시간 50분', // 오늘 총 공부시간
  },
];

const RandomStudyDetailScreen = () => {
  const route = useRoute<StudyDetailScreenRouteProp>();
  const {studyId} = route.params;

  return (
    <SafeAreaView style={RandomStudyDetailScreenStyles.safeAreaContainer}>
      <Header
        Title={
          `${studyDetail?.studyName}${STUDY_DETAIL.ROOM}` || STUDY_DETAIL.HEADER
        }
      />
      <ScrollView style={RandomStudyDetailScreenStyles.scrollView}>
        <RandomStudyDetailHeader studyDetail={studyDetail} />
        <RandomStudyMemberList participants={randomStudyMember} />
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
};

export default RandomStudyDetailScreen;
