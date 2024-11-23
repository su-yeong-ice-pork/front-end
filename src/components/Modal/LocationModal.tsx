import React, {useState} from 'react';
import UpcomingModal from './UpcomingModal';
import {LocationModalProps} from '../types/ModalType/LocationModalType';

const LocationModal: React.FC<LocationModalProps> = ({
  showModal,
  setShowModal,
}) => {
  return (
    <UpcomingModal
      showModal={showModal}
      setShowModal={setShowModal}
      text="위치 권한이 필요합니다."
    />
  );
};

export default LocationModal;
