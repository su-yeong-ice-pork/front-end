import {useState} from 'react';
import {useCreateStudy} from './useCreateStudy';

export const useCreateStudyForm = () => {
  const [name, setName] = useState('');
  const [goalMessage, setGoalMessage] = useState('');
  const [goalTime, setGoalTime] = useState('');
  const [parsedGoalTime, setParsedGoalTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const {mutate: createStudyMutate} = useCreateStudy();

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
    !isNaN(parseInt(goalTime, 10)) &&
    parseInt(goalTime, 10) >= 0;

  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }
    createStudyMutate({
      name,
      goalMessage,
      goalTime: parsedGoalTime,
    });
  };

  return {
    name,
    setName,
    goalMessage,
    setGoalMessage,
    goalTime,
    handleGoalTimeChange,
    errorMessage,
    isFormValid,
    handleSubmit,
  };
};
