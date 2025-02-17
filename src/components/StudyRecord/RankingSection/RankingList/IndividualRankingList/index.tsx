import React from 'react';
import {Image, ScrollView} from 'react-native';
import {Box, HStack, Text, VStack} from '@/components/ui';
import {RankingListStyles} from '../RankingListStyles.ts';
import {LIST_TEXT} from '@/src/constants/Ranking/Ranking.ts';
import {IndividualRankingListProps} from '@/src/components/types/RankingType/RankingSectionType.ts';

const IndividualRankingList: React.FC<IndividualRankingListProps> = ({
  rankingData,
}) => {
  return (
    <ScrollView style={RankingListStyles.container}>
      {rankingData.map((item, index) => (
        <Box key={index} style={RankingListStyles.item}>
          <Text
            style={[
              RankingListStyles.rankText,
              (item.rank === 1 || item.rank === 2 || item.rank === 3) &&
                RankingListStyles.topRankText,
            ]}>
            {item.rank}
          </Text>

          <Image
            source={require('@/assets/images/illustration/profileImage2.png')} // API 연결 시 변경 필요 { uri: item.profileImage }
            style={RankingListStyles.profileImage}
          />
          <VStack>
            <Text style={RankingListStyles.nameText}>{item.name}</Text>
            <HStack>
              <Text style={RankingListStyles.titleText}>
                {LIST_TEXT.TOTAL_TIME}
              </Text>
              <Text style={RankingListStyles.scoreText}>
                {`${item.totalStudyTime}`}
              </Text>
            </HStack>
            <HStack>
              <Text style={RankingListStyles.titleText}>{LIST_TEXT.SCORE}</Text>
              <Text style={RankingListStyles.scoreText}>
                {` ${item.grassScore}`}
              </Text>
            </HStack>
          </VStack>
        </Box>
      ))}
    </ScrollView>
  );
};

export default IndividualRankingList;
