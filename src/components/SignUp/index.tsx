import React from 'react';
import {Box} from '@/components/ui/box';

import VerifyEmail from './VerifyEmail';
import RegisterDepart from './RegisterDepart';
import InputPassword from './InputPassword';
import NickName from './NickName';

export const SignUp = () => {
  return (
    <Box>
      <VerifyEmail />
      <RegisterDepart />
      <InputPassword />
      <NickName />
    </Box>
  );
};
