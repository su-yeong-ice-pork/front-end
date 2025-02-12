import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {RankingSectionStyles} from './RankingSectionStyles';
import {Image} from 'react-native';
import {ICONS} from '@/src/constants/image/icons.ts';
import IndividualRankingList from './RankingList/IndividualRankingList';
import GroupRankingList from './RankingList/GroupRankingList';
import {DummyGroupRankingData} from '@/src/constants/Ranking/Dummy/GroupRankingList.ts';
import {DummyIndividualRankingData} from '@/src/constants/Ranking/Dummy/IndividualRankingList.ts';
import {HStack, VStack} from '@/components/ui';
import ChoiceRankingButton from '@/src/components/StudyRecord/RankingSection/ChoiceRankingButton';
import {DATE, NO_DATA} from '@/src/constants/Ranking/Ranking.ts';

const RankingSection = () => {
  const [rankingType, setRankingType] = useState<'individual' | 'group'>(
    'individual',
  );

  // API 연결 필요
  const individualRankingData = DummyIndividualRankingData;
  const groupRankingData = DummyGroupRankingData;

  const date =
    rankingType === 'individual'
      ? individualRankingData.date
      : groupRankingData.date;

  const [month, day] = date.split(/월|일/).filter(Boolean);

  const toggleRanking = () => {
    setRankingType(prevType =>
      prevType === 'individual' ? 'group' : 'individual',
    );
  };

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
        individualRankingData ? (
          <IndividualRankingList rankingData={individualRankingData.ranking} />
        ) : (
          <Text>{NO_DATA}</Text>
        )
      ) : groupRankingData ? (
        <GroupRankingList rankingData={groupRankingData.ranking} />
      ) : (
        <Text>{NO_DATA}</Text>
      )}
    </Box>
  );
};

export default RankingSection;
