import {Box} from '@/components/ui/box';
import GroupAuth from './GroupAuthButton';
import {Dimensions} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');
const AuthButtons = () => {
  return (
    <Box
      className="flex-row justify-between"
      style={{
        paddingHorizontal: width * 0.05,
        marginVertical: height * 0.05,
      }}>
      <GroupAuth />
    </Box>
  );
};

export default AuthButtons;
