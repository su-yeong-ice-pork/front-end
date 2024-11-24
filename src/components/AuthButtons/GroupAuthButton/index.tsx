import {Button, ButtonText, ButtonIcon} from '@/components/ui/button';
import React, {useState} from 'react';
import {Image} from 'react-native';
import UpcomingModal from '../../Modal/UpcomingModal';
import {GroupAuthStyles} from './GroupAuth';
const IMAGES = {
  together: require('../../../../assets/images/illustration/typeOne.png'),
};

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
          <Image source={IMAGES.together} style={GroupAuthStyles.icon} />
        </ButtonIcon>
        <ButtonText style={GroupAuthStyles.text}>
          랜덤 스터디 매칭하기
        </ButtonText>
      </Button>
      <UpcomingModal
        showModal={showModal}
        setShowModal={setShowModal}
        text="추가 예정 기능입니다."
      />
    </>
  );
};

export default GroupAuth;
