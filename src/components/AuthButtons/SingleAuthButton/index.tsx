import {Button, ButtonText, ButtonIcon} from '@/components/ui/button';
import React, {useState} from 'react';
import {Image} from 'react-native';
import LocationModal from '../../Modal/LocationModal';
import {SingleAuthStyles} from './SingleAuth';
const IMAGES = {
  self: require('../../../../assets/images/illustration/typeTwo.png'),
};

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
          <Image source={IMAGES.self} style={SingleAuthStyles.icon} />
        </ButtonIcon>
        <ButtonText style={SingleAuthStyles.text}>혼자 인증하기</ButtonText>
      </Button>
      <LocationModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default SingleAuth;
