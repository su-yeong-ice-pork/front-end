import React, {useState} from 'react';
import {HomeBadgeViewStyles} from './HomeBadgeViewStyles.ts';
import {ProfileBadgeViewStyles} from './ProfileBadgeViewStyles.ts';

import {HStack} from '@/components/ui/hstack';
import {Button, ButtonText} from '@/components/ui/button';
import {BadgesProps} from '@/src/api/badge/getBadgesPropsType';
import BadgeModal from '../BadgeModal';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {BADGES} from '@/src/constants/image/badges';

const BadgeView: React.FC<BadgesProps> = ({badges,styleType}) => {
  const badgeViewStyles = styleType === 'home' ? HomeBadgeViewStyles : ProfileBadgeViewStyles;

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  return (
    <HStack style={badgeViewStyles.badgeStackBox}>
      {badges && badges.length > 0 ? (
        <>
          {badges.slice(0, 3).map(badge => (
            <Image
              alt="badge"
              key={badge.id}
              source={BADGES[Number(badge.fileName)] || BADGES[0]}
              style={badgeViewStyles.badge}
            />
          ))}
          {badges.length > 0 && (
            <Button
              className="active:opacity-80 active:scale-95"
              onPress={openModal}
              style={badgeViewStyles.moreButton}>
              <ButtonText style={badgeViewStyles.moreText}>...</ButtonText>
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
