import {Button, ButtonText, ButtonIcon} from '@/components/ui/button';
import React, {useState} from 'react';
import {Image} from 'react-native';
import UpcomingModal from '../../Modal/UpcomingModal';
import {GroupAuthStyles} from './GroupAuth';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {MESSAGES} from '@/src/constants/BottomBar/Messages';
const GroupAuth = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      <Button
        className="active:opacity-80 active:scale-95"
        variant="solid"
        action="primary"
        style={GroupAuthStyles.button}
        onPress={handleModalOpen}>
        <ButtonIcon>
          <Image source={ILLUSTRATIONS.TYPE_ONE} style={GroupAuthStyles.icon} />
        </ButtonIcon>
        <ButtonText style={GroupAuthStyles.text}>
          랜덤 스터디 매칭하기
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

export default GroupAuth;
