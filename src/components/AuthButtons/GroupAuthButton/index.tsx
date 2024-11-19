import {Button, ButtonText, ButtonIcon} from '@/components/ui/button';
import React, {useState} from 'react';
import {Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const IMAGES = {
  self: require('../../../../assets/images/illustration/typeTwo.png'),
  together: require('../../../../assets/images/illustration/typeOne.png'),
};

const GroupAuth = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const handleNotUseableModal = () => {
    setModalMessage('추가 예정인 기능입니다.111');
    console.log(modalMessage);
    setModalVisible(true);
    return;
  };

  return (
    <Button
      className="bg-primary rounded-lg shadow-lg"
      variant="solid"
      action="primary"
      style={{
        width: width * 0.4,
        height: height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1AA5AA',
      }}
      onPress={handleNotUseableModal}
      T>
      <ButtonIcon>
        <Image
          source={IMAGES.together}
          style={{
            width: width * 0.3,
            height: height * 0.08,
            resizeMode: 'contain',
            marginTop: 10,
          }}
        />
      </ButtonIcon>
      <ButtonText
        style={{
          marginTop: 10,
          color: '#fff',
          fontSize: width * 0.04,
          fontWeight: 'bold',
          fontFamily: 'NanumSquareNeo-Variable',
        }}>
        함께 인증하기
      </ButtonText>
    </Button>
  );
};

export default GroupAuth;
