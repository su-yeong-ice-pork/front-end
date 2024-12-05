import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import moment from 'moment';
import React from 'react';
import {DateModalStyles} from './dateModalStyles';
import {Modal, ModalCloseButton} from '@/components/ui/modal';
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
      isOpen={visible}
      onClose={onClose}
      style={DateModalStyles.modalBackground}>
      <Box>
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
          <ModalCloseButton style={DateModalStyles.closeButton}>
            <Text style={DateModalStyles.closeButtonText}>닫기</Text>
          </ModalCloseButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default DateModal;
