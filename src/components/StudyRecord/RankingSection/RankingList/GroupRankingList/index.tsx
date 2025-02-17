import React from 'react';
import {Image, ScrollView} from 'react-native';
import {Box, HStack, Text, VStack} from '@/components/ui';
import {RankingListStyles} from '../RankingListStyles.ts';
import {LIST_TEXT} from '@/src/constants/Ranking/Ranking.ts';
import {ICONS} from '@/src/constants/image/icons.ts';
import {GroupRankingListProps} from '@/src/components/types/RankingType/RankingSectionType.ts';

const GroupRankingList: React.FC<GroupRankingListProps> = ({rankingData}) => {
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
          <VStack style={RankingListStyles.textContainer}>
            <HStack>
              <Text style={RankingListStyles.nameText}>{item.studyName}</Text>
              <HStack style={RankingListStyles.memberCount}>
                <Image
                  source={ICONS.FRIENDS_ICON_COLORED}
                  style={RankingListStyles.memberIcon}
                />
                <Text style={RankingListStyles.memberCountText}>
                  {item.memberCount}
                </Text>
              </HStack>
            </HStack>

            <HStack>
              <Text style={RankingListStyles.titleText}>
                {LIST_TEXT.TOTAL_TIME}
              </Text>
              <Text style={RankingListStyles.scoreText}>
                {`${item.totalStudyTime}`}
              </Text>
            </HStack>
          </VStack>
        </Box>
      ))}
    </ScrollView>
  );
};

export default GroupRankingList;
