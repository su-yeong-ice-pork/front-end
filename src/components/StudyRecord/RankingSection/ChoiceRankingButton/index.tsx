import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Text} from '@/components/ui/text';
import {ChoiceRankingButtonStyles} from './ChoiceRankingButtonStyles.ts';
import {HStack} from '@/components/ui';
import {ICONS} from '@/src/constants/image/icons.ts';
import {ChoiceRankingButtonProps} from '@/src/components/types/RankingType/RankingButtonType.ts';

const ChoiceRankingButton: React.FC<ChoiceRankingButtonProps> = ({
  rankingType,
  toggleRanking,
}) => {
  return (
    <HStack style={ChoiceRankingButtonStyles.container}>
      <TouchableOpacity onPress={toggleRanking}>
        <Image
          source={ICONS.RIGHT_ARROW}
          style={[
            ChoiceRankingButtonStyles.buttonIcon,
            {transform: [{scaleX: -1}]},
          ]}
        />
      </TouchableOpacity>
      <Text style={ChoiceRankingButtonStyles.rankingText}>
        {rankingType === 'group' ? '그룹 랭킹' : '개인 랭킹'}
      </Text>
      <TouchableOpacity onPress={toggleRanking}>
        <Image
          source={ICONS.RIGHT_ARROW}
          style={ChoiceRankingButtonStyles.buttonIcon}
        />
      </TouchableOpacity>
    </HStack>
  );
};

export default ChoiceRankingButton;
