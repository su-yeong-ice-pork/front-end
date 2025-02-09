import React from 'react';
import {View, Image} from 'react-native';
import {Box, Text} from '@/components/ui';
import {IndividualRankingListStyles} from './IndividualRankingListStyles.ts';

const IndividualRankingList = ({rankingData}) => {
  return (
    <Box style={IndividualRankingListStyles.container}>
      {rankingData.map((item, index) => (
        <Box key={index} style={IndividualRankingListStyles.item}>
          <Text style={IndividualRankingListStyles.rankText}>{item.rank}</Text>
          <Image
            source={{uri: item.profileImage}}
            style={IndividualRankingListStyles.profileImage}
          />
          <Text style={IndividualRankingListStyles.nameText}>{item.name}</Text>
          <Text style={IndividualRankingListStyles.totalStudyTimeText}>
            {`총 공부시간: ${item.totalStudyTime}`}
          </Text>
          <Text style={IndividualRankingListStyles.grassScoreText}>
            {`잔디 점수: ${item.grassScore}`}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default IndividualRankingList;
