import {Button, ButtonText} from '@/components/ui/button';
import React, {useState} from 'react';
import {Box} from '@/components/ui/box';
import {Image} from 'react-native';
import {MESSAGES} from '@/src/constants/BottomBar/Messages';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {freezeButtonStyles} from './freezeButtonStyles';
import UpcomingModal from '../../Modal/UpcomingModal';
const FreezeButton = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      <Button
        onPress={handleModalOpen}
        className="active:opacity-80 active:scale-95"
        style={freezeButtonStyles.frozenText}>
        <Image
          source={ILLUSTRATIONS.FREEZE}
          style={freezeButtonStyles.freeze}
        />
        <ButtonText style={freezeButtonStyles.useFrozenButtonText}>
          프리즈 사용하기
        </ButtonText>
      </Button>
      <UpcomingModal
        showModal={showModal}
        setShowModal={setShowModal}
        text={MESSAGES.MODAL}
      />
    </>
  );
};
export default FreezeButton;
