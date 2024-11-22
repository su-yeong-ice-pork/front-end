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

type UpcomingModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  text: string;
};

const UpcomingModal: React.FC<UpcomingModalProps> = ({
  showModal,
  setShowModal,
  text,
}) => {
  const closeModal = () => setShowModal(false);
  return (
    <Modal isOpen={showModal} onClose={closeModal}>
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
