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
import {useRoute} from '@react-navigation/native';
import {useStudyDetail} from '@/src/hooks/useStudyDetail';
import {useStudyParticipants} from '@/src/hooks/useStudyParticipants';
import Loader from '@/src/components/Loader';
import {Text} from '@/components/ui';
import {StudyDetailScreenRouteProp} from '@/src/components/types/StudyDetailType/StudyDetailType';

const StudyDetailScreen = () => {
  const route = useRoute<StudyDetailScreenRouteProp>();
  const {studyId} = route.params;

  const {
    data: studyDetail,
    isLoading: isDetailLoading,
    error: detailError,
  } = useStudyDetail(studyId);
  const {
    data: participants,
    isLoading: isParticipantsLoading,
    error: participantsError,
  } = useStudyParticipants(studyId);

  if (isDetailLoading || isParticipantsLoading) {
    return (
      <SafeAreaView style={StudyDeatilScreenStyle.outContainer}>
        <Loader />
      </SafeAreaView>
    );
  }

  if (detailError || participantsError) {
    return (
      <SafeAreaView style={StudyDeatilScreenStyle.outContainer}>
        <Text>Error: {(detailError || participantsError)?.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={StudyDeatilScreenStyle.outContainer}>
        <Box style={StudyDeatilScreenStyle.container}>
          <Header
            Title={
              `${studyDetail?.studyName}${STUDY_DETAIL.ROOM}` ||
              STUDY_DETAIL.HEADER
            }
          />
          <ScrollView contentContainerStyle={StudyDeatilScreenStyle.main}>
            <StudyDetailHeader studyDetail={studyDetail!} />
            <StudyMemberList participants={participants!} />
          </ScrollView>
        </Box>
      </SafeAreaView>
      <BottomBar />
    </>
  );
};

export default StudyDetailScreen;
