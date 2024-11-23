import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
} from '@/components/ui/modal';
import {Text, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Box} from '@/components/ui/box';
import {BadgeModalStyles} from './BadgeModal';
import {BadgeModalProps} from '../../types/ModalType/BadgeModal';
import {BADGES} from '@/src/constants/image/badges';

const BadgeModal: React.FC<BadgeModalProps> = ({
  showModal,
  setShowModal,
  badges,
}) => {
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Modal isOpen={showModal} onClose={closeModal}>
      <ModalBackdrop />

      <ModalContent style={BadgeModalStyles.modalView}>
        <ModalHeader style={BadgeModalStyles.modalHeaderContainer}>
          <Text style={BadgeModalStyles.modalHeaderText}>프로필 뱃지 </Text>
          <Text style={BadgeModalStyles.modalHeaderHighlight}>
            총 {badges ? badges.length : 0}개 보유 중
          </Text>
        </ModalHeader>
        <ScrollView style={BadgeModalStyles.modalScrollView}>
          {badges &&
            badges.map(badge => (
              <Box key={badge.id} style={BadgeModalStyles.modalBadge}>
                <Image
                  source={BADGES[Number(badge.fileName)] || BADGES[0]}
                  style={BadgeModalStyles.modalBadgeImage}
                />
                <Box style={BadgeModalStyles.modalBadgeInfo}>
                  <Text style={BadgeModalStyles.modalBadgeName}>
                    {badge.name}
                  </Text>
                  <Text style={BadgeModalStyles.modalBadgeDescription}>
                    {badge.description}
                  </Text>
                </Box>
              </Box>
            ))}
        </ScrollView>
        <ModalCloseButton style={BadgeModalStyles.closeButton}>
          <Text style={BadgeModalStyles.closeButtonText}>닫기</Text>
        </ModalCloseButton>
      </ModalContent>
    </Modal>
  );
};

export default BadgeModal;
