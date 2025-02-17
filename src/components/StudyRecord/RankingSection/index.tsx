import React from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {Box, HStack, Text, VStack} from '@/components/ui';
import {RankingSectionStyles} from './RankingSectionStyles';
import {ICONS} from '@/src/constants/image/icons';
import IndividualRankingList from './RankingList/IndividualRankingList';
import GroupRankingList from './RankingList/GroupRankingList';
import ChoiceRankingButton from '@/src/components/StudyRecord/RankingSection/ChoiceRankingButton';
import {DATE, NO_DATA} from '@/src/constants/Ranking/Ranking';
import {useIndividualRanking} from '@/src/hooks/rankings/useIndividualRanking';
import {useGroupRanking} from '@/src/hooks/rankings/useGroupRanking';
import {useRankingSectionForm} from '@/src/hooks/rankings/useRankingSection';

const RankingSection = () => {
  const {
    data: individualData,
    isLoading: isIndividualLoading,
    error: individualError,
  } = useIndividualRanking();

  const {
    data: groupData,
    isLoading: isGroupLoading,
    error: groupError,
  } = useGroupRanking();

  const {rankingType, toggleRanking, month, day} = useRankingSectionForm(
    individualData,
    groupData,
  );

  if (
    (rankingType === 'individual' && isIndividualLoading) ||
    (rankingType === 'group' && isGroupLoading)
  ) {
    return (
      <Box style={RankingSectionStyles.container}>
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  if (
    (rankingType === 'individual' && individualError) ||
    (rankingType === 'group' && groupError)
  ) {
    return (
      <Box style={RankingSectionStyles.container}>
        <Text>Error: {(individualError || groupError)?.message}</Text>
      </Box>
    );
  }

  return (
    <Box style={RankingSectionStyles.container}>
      <VStack style={RankingSectionStyles.headerContainer}>
        <HStack style={RankingSectionStyles.dateContainer}>
          <Image
            source={ICONS.CALENDAR}
            style={RankingSectionStyles.calendarIcon}
          />
          <Text>
            <Text style={RankingSectionStyles.dateNumber}>{month}</Text>
            <Text style={RankingSectionStyles.dateText}>{DATE.MONTH}</Text>
            <Text style={RankingSectionStyles.dateNumber}>{day}</Text>
            <Text style={RankingSectionStyles.dateText}>{DATE.DAY}</Text>
          </Text>
        </HStack>
        <ChoiceRankingButton
          rankingType={rankingType}
          toggleRanking={toggleRanking}
        />
      </VStack>

      {rankingType === 'individual' ? (
        individualData && individualData.ranking.length > 0 ? (
          <IndividualRankingList rankingData={individualData.ranking} />
        ) : (
          <Text>{NO_DATA}</Text>
        )
      ) : groupData && groupData.ranking.length > 0 ? (
        <GroupRankingList rankingData={groupData.ranking} />
      ) : (
        <Text>{NO_DATA}</Text>
      )}
    </Box>
  );
};

export default RankingSection;
