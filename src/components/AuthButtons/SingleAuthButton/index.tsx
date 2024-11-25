import {Button, ButtonText, ButtonIcon} from '@/components/ui/button';
import React, {useState} from 'react';
import {Image} from 'react-native';
import LocationModal from '../../Modal/LocationModal';
import {SingleAuthStyles} from './SingleAuth';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';

const SingleAuth = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      <Button
        className="active:opacity-80 active:scale-95"
        style={SingleAuthStyles.button}
        onPress={handleModalOpen}>
        <ButtonIcon>
          <Image
            source={ILLUSTRATIONS.TYPE_TWO}
            style={SingleAuthStyles.icon}
          />
        </ButtonIcon>
        <ButtonText style={SingleAuthStyles.text}>혼자 인증하기</ButtonText>
      </Button>
      <LocationModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default SingleAuth;
