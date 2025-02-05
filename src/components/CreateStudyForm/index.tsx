import React, {useState} from 'react';
import {VStack} from '@/components/ui';
import CreateStudyInputField from '@/src/components/CreateStudyForm/InputField';
import {ICONS} from '@/src/constants/image/icons';
import {CREATE_FORM} from '@/src/constants/CreateStudy/createStudy.ts';
import {CreateStudyFormStyles} from '@/src/components/CreateStudyForm/CreateStudyFormStyles.ts';
import SubmitButton from '@/src/components/CreateStudyForm/SubmitButton';
import Introduction from '@/src/components/CreateStudyForm/Introduction';
import {Text} from 'react-native';

const CreateStudyForm = ({}) => {
  const [name, setName] = useState('');
  const [goalMessage, setGoalMessage] = useState('');
  const [goalTime, setGoalTime] = useState('');
  const [parsedGoalTime, setParsedGoalTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  //임시 코드 - 생성 버튼 클릭 시 API 연결
  const handleSubmit = () => {
    console.log('Name:', name);
    console.log('Goal Message:', goalMessage);
    console.log('Goal Time:', parsedGoalTime); //parsedGoalTime 이 Int형입니당~
  };

  const handleGoalTimeChange = (text: string) => {
    const parsedValue = parseInt(text, 10);
    if (isNaN(parsedValue) || text.length > 4) {
      setErrorMessage('시간은 4자리 이내의 숫자만 입력할 수 있습니다.');
      setGoalTime('');
    } else {
      setErrorMessage('');
      setGoalTime(text);
      setParsedGoalTime(parsedValue);
    }
  };

  const isFormValid =
    name.trim() !== '' &&
    goalMessage.trim() !== '' &&
    !isNaN(parseInt(goalTime)) &&
    parseInt(goalTime) >= 0;

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
          errorMessage={errorMessage}
          description={CREATE_FORM.GOAL_TIME.DESCRIPTION}
          icon={ICONS.CLOCK_RED}
          value={goalTime}
          onChange={handleGoalTimeChange}
        />
      </VStack>
      <Introduction />
      <SubmitButton handleSubmit={handleSubmit} isFormValid={isFormValid} />
    </VStack>
  );
};

export default CreateStudyForm;
