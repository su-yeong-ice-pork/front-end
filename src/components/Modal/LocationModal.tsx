import React from 'react';
import UpcomingModal from './UpcomingModal';

type LocationModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

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
