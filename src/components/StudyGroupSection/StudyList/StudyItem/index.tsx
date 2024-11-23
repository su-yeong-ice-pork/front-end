import React from 'react';

import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {StudyItemStyles} from './StudyItemStyles';
import StudyItemLayout from './StudyItemLayout';

import {ICONS} from '@/src/constants/image/icons';
import {StudyItemProps} from '@/src/components/types/StudyGroupScreenType/StudyItemProps';
import {ALT, STUDY_GROUP} from '@/src/constants/StudyGroup/study';

import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';

const StudyItem: React.FC<StudyItemProps> = ({
  name,
  totalStudyTime,
  memberCount,
}) => {
  const navigation = useNavigation();
  const navigateToDetail = () => navigation.navigate(STUDY_GROUP.NAME);
  return (
    <StudyItemLayout name={name}>
      <Box style={StudyItemStyles.container}>
        <TouchableOpacity onPress={navigateToDetail}>
          <Box style={StudyItemStyles.studyInfoContainer}>
            <Box style={StudyItemStyles.studyNameContainer}>
              <Text style={StudyItemStyles.studyNameText}>{name}</Text>
              <Box style={StudyItemStyles.memberContainer}>
                <Image
                  source={ICONS.USERS}
                  style={StudyItemStyles.memberIcon}
                  alt={ALT.USERS}
                />
                <Text style={StudyItemStyles.memberCountText}>
                  {memberCount}
                </Text>
              </Box>
            </Box>
          </Box>

          <Image
            source={ICONS.RIGHT_ARROW}
            style={StudyItemStyles.studyInfoIconAbsolute}
            alt={ALT.ARROW}
          />

          <Box style={StudyItemStyles.studyTimeContainer}>
            <Text style={StudyItemStyles.studyTimeText}>
              총 공부시간:{' '}
              <Text style={StudyItemStyles.studyTimeHighlight}>
                {totalStudyTime}시간
              </Text>
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </StudyItemLayout>
  );
};

export default StudyItem;
