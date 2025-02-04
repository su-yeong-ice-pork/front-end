import React, {useState} from 'react';
import {VStack} from '@/components/ui';
import CreateStudyInputField from '@/src/components/CreateStudyForm/InputField';
import {ICONS} from '@/src/constants/image/icons';
import {CREATE_FORM,} from '@/src/constants/CreateStudy/createStudy.ts';
import {CreateStudyFormStyles} from '@/src/components/CreateStudyForm/CreateStudyFormStyles.ts';
import SubmitButton from '@/src/components/CreateStudyForm/SubmitButton';
import Introduction from '@/src/components/CreateStudyForm/Introduction';

const CreateStudyForm = ({}) => {
  const [name, setName] = useState('');
  const [goalMessage, setGoalMessage] = useState('');
  const [goalTime, setGoalTime] = useState('');

  //임시 코드 - 생성 버튼 클릭 시 API 연결
  const handleSubmit = () => {
    console.log('Name:', name);
    console.log('Goal Message:', goalMessage);
    console.log('Goal Time:', goalTime);
  };

  const isFormValid =
    name.trim() !== '' && goalMessage.trim() !== '' && goalTime.trim() !== '';

  return (
    <VStack style={CreateStudyFormStyles.fullContainer}>
      <VStack style={CreateStudyFormStyles.inputContainer}>
        <CreateStudyInputField
          title={CREATE_FORM.NAME.TITLE}
          placeholder={CREATE_FORM.NAME.PLACEHOLDER}
          value={name}
          onChange={setName}
        />
        <CreateStudyInputField
          title={CREATE_FORM.GOAL_MESSAGE.TITLE}
          placeholder={CREATE_FORM.GOAL_MESSAGE.PLACEHOLDER}
          description={CREATE_FORM.GOAL_MESSAGE.DESCRIPTION}
          value={goalMessage}
          onChange={setGoalMessage}
        />
        <CreateStudyInputField
          title={CREATE_FORM.GOAL_TIME.TITLE}
          placeholder={CREATE_FORM.GOAL_TIME.PLACEHOLDER}
          description={CREATE_FORM.GOAL_TIME.DESCRIPTION}
          icon={ICONS.CLOCK_RED}
          value={goalTime}
          onChange={setGoalTime}
        />
      </VStack>
     <Introduction/>
      <SubmitButton handleSubmit={handleSubmit} isFormValid={isFormValid} />
    </VStack>
  );
};

export default CreateStudyForm;
