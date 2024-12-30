import React from 'react';
import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';
import {Button} from '@/components/ui/button';
import {Modal} from '@/components/ui/modal';
import {MESSAGES} from '@/src/constants/EditProfile/Message';
import {useNavigation} from '@react-navigation/native';
import {SuccessModalStyles} from './SuccessModalStyles';
import {SuccessModalProps} from '@/src/constants/EditProfile/SuccessModal';
const SuccessModal: React.FC<SuccessModalProps> = ({
  uploadSuccess,
  setUploadSuccess,
}) => {
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.navigate('Profile');
    setUploadSuccess(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={uploadSuccess}
      onRequestClose={handleClose}>
      <Button
        style={SuccessModalStyles.centeredView}
        activeOpacity={1}
        onPress={handleClose}>
        <Box style={SuccessModalStyles.modalView}>
          <Text style={SuccessModalStyles.modalText}>{MESSAGES.SUCCESS}</Text>
          <Button style={SuccessModalStyles.buttonClose} onPress={handleClose}>
            <Text style={SuccessModalStyles.textStyle2}>´Ý±â</Text>
          </Button>
        </Box>
      </Button>
    </Modal>
  );
};

export default SuccessModal;
