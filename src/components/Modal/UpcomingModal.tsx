import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@/components/ui/modal';
import {Text} from 'react-native';
import React from 'react';
import {UpcomingModalStyles} from './UpcomingModalStyle';
import {UpcomingModalProps} from '../types/ModalType/UpcomingModalTypes';

const UpcomingModal: React.FC<UpcomingModalProps> = ({
  showModal,
  setShowModal,
  text,
}) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}>
      <ModalBackdrop />
      <ModalContent style={UpcomingModalStyles.modalContent}>
        <ModalBody>
          <Text style={UpcomingModalStyles.modalText}>{text}</Text>
        </ModalBody>
        <ModalFooter>
          <ModalCloseButton style={UpcomingModalStyles.closeButton}>
            <Text style={UpcomingModalStyles.closeButtonText}>닫기</Text>
          </ModalCloseButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpcomingModal;
