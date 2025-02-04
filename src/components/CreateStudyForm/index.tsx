import React, {useState} from 'react';
import {Box, VStack} from '@/components/ui';
import CreateStudyInputField from '@/src/components/CreateStudyForm/InputField';
import {ICONS} from '@/src/constants/image/icons';
import {CREATE_FORM} from '@/src/constants/CreateStudy/createStudy.ts';
import {Button} from '@/components/ui/button';

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

  return (
    <VStack>
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
      <Box>
        <Button onPress={handleSubmit}></Button>
      </Box>
    </VStack>
  );
};

export default CreateStudyForm;
