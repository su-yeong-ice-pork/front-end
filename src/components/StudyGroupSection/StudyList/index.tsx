import React from 'react';

import StudyItem from './StudyItem/index';
import {StudyListStyles} from './StudyListStyles';

import {Box} from '@/components/ui/box';
import {StudyGroupListProps} from '../../types/StudyGroupScreenType/StudyGroupDataType';

const StudyList: React.FC<StudyGroupListProps> = ({studyData, isRandom}) => {

  return (
    <Box style={StudyListStyles.container}>
      {/*랜덤 스터디*/}
      {isRandom ? (
        <Box>
          {studyData && 'studyName' in studyData && (
            <StudyItem
              name={studyData.studyName}
              id={studyData.id}
              totalStudyTime={studyData.totalStudyTime}
              memberCount={studyData.memberCount}
              isRandom={isRandom}
            />
          )}
        </Box>
      ) : (
        // 정규 스터디
        Array.isArray(studyData) &&
        studyData.map((study, index) => (
          <Box key={index}>
            <StudyItem
              name={study.studyName}
              id={study.id}
              totalStudyTime={study.totalStudyTime}
              memberCount={study.memberCount}
              isRandom={isRandom}
            />
            {index < studyData.length - 1 && (
              <Box style={StudyListStyles.separator} />
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

export default StudyList;
