import {Button, ButtonText, ButtonIcon} from '@/components/ui/button';
import React, {useState} from 'react';
import {Image} from 'react-native';
import DailyStudyModal from '../../DailyStudyModal';
import {GroupAuthStyles} from './GroupAuth';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';

const GroupAuth = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button
        className="active:opacity-80 active:scale-95"
        variant="solid"
        action="primary"
        style={GroupAuthStyles.button}
        onPress={() => setShowModal(true)}>
        <ButtonIcon>
          <Image source={ILLUSTRATIONS.TYPE_ONE} style={GroupAuthStyles.icon} />
        </ButtonIcon>
        <ButtonText style={GroupAuthStyles.text}>
          랜덤 스터디 매칭하기
        </ButtonText>
      </Button>
      <DailyStudyModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default GroupAuth;
