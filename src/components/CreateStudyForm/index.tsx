import React from 'react';
import {VStack} from '@/components/ui';
import CreateStudyInputField from '@/src/components/CreateStudyForm/InputField';
import {ICONS} from '@/src/constants/image/icons';
import {CREATE_FORM} from '@/src/constants/CreateStudy/createStudy.ts';

const CreateStudyForm = ({}) => {
  return (
  <VStack>
    <CreateStudyInputField title={CREATE_FORM.NAME.TITLE} placeholder={CREATE_FORM.NAME.PLACEHOLDER}/>
    <CreateStudyInputField title={CREATE_FORM.GOAL_MESSAGE.TITLE} placeholder={CREATE_FORM.GOAL_MESSAGE.PLACEHOLDER} description={CREATE_FORM.GOAL_MESSAGE.DESCRIPTION}/>
    <CreateStudyInputField title={CREATE_FORM.GOAL_TIME.TITLE} placeholder={CREATE_FORM.GOAL_TIME.PLACEHOLDER} description={CREATE_FORM.GOAL_TIME.DESCRIPTION} icon={ICONS.CLOCK_RED}/>
  </VStack>
  );
};

export default CreateStudyForm;
