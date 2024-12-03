import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import moment from 'moment';
import React from 'react';
import {DateModalStyles} from './dateModalStyles';
import {Modal} from 'react-native';
import {Button} from '@/components/ui/button';
const DateModal = ({
  visible,
  onClose,
  selectedDate,
  selectedDateData,
}: {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedDateData: any;
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <Box style={DateModalStyles.modalBackground}>
        <Box style={DateModalStyles.modalContainer}>
          <Text style={DateModalStyles.modalTitle}>
            {selectedDate
              ? moment(selectedDate, 'YYYY-MM-DD').isValid()
                ? moment(selectedDate, 'YYYY-MM-DD').format('YYYY년 MM월 DD일')
                : '유효하지 않은 날짜'
              : ''}
          </Text>
          {selectedDateData ? (
            <>
              <Text style={DateModalStyles.modalDesc}>
                공부 시간: {selectedDateData.studyTime} 시간
              </Text>
              <Text style={DateModalStyles.modalDesc}>
                잔디 점수: {selectedDateData.grassScore}
              </Text>
            </>
          ) : (
            <Text>데이터가 없습니다.</Text>
          )}
          <Button style={DateModalStyles.closeButton} onPress={onClose}>
            <Text style={DateModalStyles.closeButtonText}>닫기</Text>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DateModal;
