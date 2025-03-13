import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from '@/components/ui/safe-area-view';
import {ScrollView} from '@/components/ui/scroll-view';
import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';
import Header from '@/src/components/Header';
import BottomBar from '@/src/components/BottomBar';
import NoticeModal from '@/src/components/NoticeModal';
import Loader from '@/src/components/Loader';
import {STUDY_DETAIL} from '@/src/constants/StudyDetail/studyDetail';
import RecordTapSection from '@/src/components/StudyRecord/RecordTapSection';
import RankingSection from '@/src/components/StudyRecord/RankingSection';
import {
  StudyRecordScreenStyles,
  ScrollContentPaddingBottom,
} from './StudyRecordScreenStyles';
import {useRecoilValue} from 'recoil';
import userState from '@/src/recoil/userAtom';
import {useStudyRecordForm} from '@/src/hooks/studyRecord/useStudyRecordForm';

const StudyRecordScreen = () => {
  const user = useRecoilValue(userState);
  const {
    isRecording,
    timeElapsed,
    activeTab,
    todayStudyTime,
    totalStudyTime,
    isLoading,
    modalVisible,
    modalTitle,
    modalMessage,
    handleStudyButtonPress,
    handleTabPress,
    closeModal,
    formatTime,
  } = useStudyRecordForm();

  return (
    <SafeAreaView style={StudyRecordScreenStyles.container}>
      <Box style={StudyRecordScreenStyles.container}>
        <Header Title={STUDY_DETAIL.TITLE} />
        <ScrollView
          style={StudyRecordScreenStyles.main}
          contentContainerStyle={ScrollContentPaddingBottom}>
          <Box style={StudyRecordScreenStyles.tabsContainer}>
            <TouchableOpacity
              style={
                activeTab === STUDY_DETAIL.RECORD
                  ? StudyRecordScreenStyles.activeTab
                  : StudyRecordScreenStyles.inactiveTab
              }
              onPress={() => handleTabPress(STUDY_DETAIL.RECORD)}>
              <Text
                style={
                  activeTab === STUDY_DETAIL.RECORD
                    ? StudyRecordScreenStyles.activeTabText
                    : StudyRecordScreenStyles.inactiveTabText
                }>
                기록장
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                activeTab === STUDY_DETAIL.RANKING
                  ? StudyRecordScreenStyles.activeTab
                  : StudyRecordScreenStyles.inactiveTab
              }
              onPress={() => handleTabPress(STUDY_DETAIL.RANKING)}>
              <Text
                style={
                  activeTab === STUDY_DETAIL.RANKING
                    ? StudyRecordScreenStyles.activeTabText
                    : StudyRecordScreenStyles.inactiveTabText
                }>
                기록 랭킹
              </Text>
            </TouchableOpacity>
          </Box>
          {activeTab !== STUDY_DETAIL.RANKING && (
            <RecordTapSection
              title={user?.mainTitle || STUDY_DETAIL.DEFAULT_TITLE}
              name={user?.name || STUDY_DETAIL.DEFAULT_TITLE}
              profileImage={user?.profileImage || STUDY_DETAIL.DEFAULT_IMAGE}
              studyMessage={user?.message || STUDY_DETAIL.DEFAULT_MESSAGE}
              timerValue={
                isRecording
                  ? formatTime(todayStudyTime + timeElapsed)
                  : formatTime(todayStudyTime)
              }
              totalTimeValue={formatTime(totalStudyTime)}
              isRecording={isRecording}
              onStudyButtonPress={handleStudyButtonPress}
            />
          )}
          {activeTab === STUDY_DETAIL.RANKING && <RankingSection />}
        </ScrollView>
      </Box>
      <NoticeModal
        visible={modalVisible}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
      />
      {isLoading && <Loader />}
      <BottomBar />
    </SafeAreaView>
  );
};

export default StudyRecordScreen;
