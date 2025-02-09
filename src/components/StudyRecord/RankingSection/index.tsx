import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {RankingSectionStyles} from './RankingSectionStyles';
import {Image, TouchableOpacity} from 'react-native';
import {ICONS} from '@/src/constants/image/icons.ts';
import RankingList from './IndividualRankingList';
import {DummyIndividualRankingData} from '@/src/constants/Ranking/Dummy/IndividualRankingList.ts';
import {HStack, VStack} from '@/components/ui';
import ChoiceRankingButton from '@/src/components/StudyRecord/RankingSection/ChoiceRankingButton';

const RankingSection = () => {
  // API 연결 필요
  const rankingData = DummyIndividualRankingData;

  const [rankingType, setRankingType] = useState('individual');
  const date = rankingData.date;

  const [month, day] = date.split(/월|일/).filter(Boolean);

  const toggleRanking = () => {
    setRankingType((prevType) => (prevType === 'individual' ? 'group' : 'individual'));
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
            <Text style={RankingSectionStyles.dateText}>{'월'}</Text>
            <Text style={RankingSectionStyles.dateNumber}>{` ${day}`}</Text>
            <Text style={RankingSectionStyles.dateText}>{'일'}</Text>
          </Text>
        </HStack>

        <ChoiceRankingButton
          rankingType={rankingType}
          toggleRanking={toggleRanking}
        />
      </VStack>

      {rankingData ? (
        <RankingList rankingData={rankingData.ranking} /> // 랭킹 리스트 컴포넌트
      ) : (
        <Text>데이터가 없습니다.</Text>
      )}
    </Box>
  );
};

export default RankingSection;
