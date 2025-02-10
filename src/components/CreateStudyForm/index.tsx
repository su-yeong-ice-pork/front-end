import React from 'react';
import {VStack} from '@/components/ui';
import CreateStudyInputField from '@/src/components/CreateStudyForm/InputField';
import {ICONS} from '@/src/constants/image/icons';
import {CREATE_FORM} from '@/src/constants/CreateStudy/createStudy';
import {CreateStudyFormStyles} from '@/src/components/CreateStudyForm/CreateStudyFormStyles';
import SubmitButton from '@/src/components/CreateStudyForm/SubmitButton';
import Introduction from '@/src/components/CreateStudyForm/Introduction';
import {useCreateStudyForm} from '@/src/hooks/useCreateStudyForm';

const CreateStudyForm = () => {
  const {
    name,
    setName,
    goalMessage,
    setGoalMessage,
    goalTime,
    handleGoalTimeChange,
    errorMessage,
    isFormValid,
    handleSubmit,
  } = useCreateStudyForm();

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
