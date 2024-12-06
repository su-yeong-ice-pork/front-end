import React from 'react';
import {Box} from '@/components/ui/box';
import VerifyEmail from './VerifyEmail';
import RegisterDepart from './RegisterDepart';

export const SignUp = () => {
  return (
    <Box>
      <VerifyEmail />
      <RegisterDepart />
    </Box>
  );
};
