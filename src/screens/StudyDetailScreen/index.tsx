import React from 'react';
import Header from '../../components/Header';
import BottomBar from '../../components/BottomBar/index';
import {StudyDeatilScreenStyle} from './StudyDetailScreenStyle';
import {STUDY_DETAIL} from '@/src/constants/StudyDetail/studyDetail';
import StudyDetailHeader from '@/src/components/StudyDetail/StudyDetailHeader';
import {Box} from '@/components/ui/box';
import {SafeAreaView} from '@/components/ui/safe-area-view';
import {ScrollView} from '@/components/ui/scroll-view';
import StudyMemberList from '@/src/components/StudyDetail/StudyMemberList';

const StudyDetailScreen = () => {
  return (
    <>
      <SafeAreaView style={StudyDeatilScreenStyle.outContainer}>
        <Box style={StudyDeatilScreenStyle.container}>
          <Header Title={STUDY_DETAIL.HEADER} />
          <ScrollView contentContainerStyle={StudyDeatilScreenStyle.main}>
            <StudyDetailHeader studyId={1} />
            <StudyMemberList />
          </ScrollView>
        </Box>
      </SafeAreaView>
      <BottomBar />
    </>
  );
};

export default StudyDetailScreen;
