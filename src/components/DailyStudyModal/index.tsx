import React, {useState} from 'react';
import {Modal} from 'react-native';
import {Box, VStack} from '@/components/ui';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui';
import {Button, ButtonText} from '@/components/ui/button';

import {ICONS} from '@/src/constants/image/icons';
import {DAILY_STUDY_MODAL} from '@/src/constants/DailyStudyModal/DailyStudyModal';
import SelectDate from './SelectDate';
import {DailyStudyModalProps} from '../types/DailyStudyModalType/DailyStudyModal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DailyStudyModalStyles} from './DailyStudyModalStyles';

const DailyStudyModal: React.FC<DailyStudyModalProps> = ({isOpen, onClose}) => {
  const [attendanceDate, setAttendanceDate] = useState<string>('');
  const [attendanceTime, setAttendanceTime] = useState<string>('');

  const handleConfirm = () => {
    console.log(attendanceDate, attendanceTime);
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType={DAILY_STUDY_MODAL.ANIMATION_TYPE}>
      <GestureHandlerRootView>
        <Box style={DailyStudyModalStyles.backdrop}>
          <Box style={DailyStudyModalStyles.modalContainer}>
            <Box style={DailyStudyModalStyles.modalHeader}>
              <Text style={DailyStudyModalStyles.headerText}>
                {DAILY_STUDY_MODAL.TITLE}
                <Image
                  source={ICONS.PENCIL}
                  alt={DAILY_STUDY_MODAL.PENCIL_ICON}
                  style={DailyStudyModalStyles.pencilIcon}
                />
              </Text>
              <Button
                onPress={onClose}
                style={DailyStudyModalStyles.closeButtonContainer}>
                <Image
                  style={DailyStudyModalStyles.closeButton}
                  source={ICONS.CLOSE_BUTTON}
                  alt={DAILY_STUDY_MODAL.CLOSE_ICON}
                />
              </Button>
            </Box>

            <VStack style={DailyStudyModalStyles.modalBody}>
              <SelectDate
                setAttendanceDate={setAttendanceDate}
                setAttendanceTime={setAttendanceTime}
              />
              <Box>
                <Button
                  style={DailyStudyModalStyles.joinButton}
                  onPress={handleConfirm}>
                  <ButtonText>{DAILY_STUDY_MODAL.JOIN_STUDY_BUTTON}</ButtonText>
                </Button>
              </Box>
            </VStack>
          </Box>
        </Box>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default DailyStudyModal;
