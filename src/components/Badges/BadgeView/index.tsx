import React, {useState, useEffect} from 'react';
import {BadgeViewStyles} from './BadgeViewStyles';
import {HStack} from '@/components/ui/hstack';
import {Button, ButtonText} from '@/components/ui/button';
import {Image, Text} from 'react-native';
import {BadgesProps} from '@/src/api/badge/getBadgesPropsType';
import BadgeModal from '../BadgeModal';
import {BADGES} from '@/src/constants/image/badges';
const BadgeView: React.FC<BadgesProps> = ({badges}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <HStack>
      {badges && badges.length > 0 ? (
        <>
          {badges.slice(0, 3).map(badge => (
            <Image
              key={badge.id}
              source={BADGES[Number(badge.fileName)] || BADGES[0]}
              style={BadgeViewStyles.badge}
            />
          ))}
          {badges.length > 0 && (
            <Button
              className="active:opacity-80 active:scale-95"
              onPress={() => setShowModal(true)}
              style={BadgeViewStyles.moreButton}>
              <ButtonText style={BadgeViewStyles.moreText}>...</ButtonText>
            </Button>
          )}
          <BadgeModal
            showModal={showModal}
            setShowModal={setShowModal}
            badges={badges}
          />
        </>
      ) : (
        <Text>보유한 뱃지가 없습니다.</Text>
      )}
    </HStack>
  );
};

export default BadgeView;
