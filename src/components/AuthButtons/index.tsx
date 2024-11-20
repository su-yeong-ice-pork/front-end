import {Box} from '@/components/ui/box';
import GroupAuth from './GroupAuthButton';
import SingleAuth from './SingleAuthButton';
import React from 'react';
import {AuthButtonStyles} from './AuthButtonStyles';

const AuthButtons = () => {
  return (
    <Box style={AuthButtonStyles.container}>
      <GroupAuth />
      <SingleAuth />
    </Box>
  );
};

export default AuthButtons;
