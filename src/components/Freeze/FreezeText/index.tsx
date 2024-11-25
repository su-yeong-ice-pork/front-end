import React, {useState} from 'react';
import {FreezeTextStyles} from './freezeTextStyles';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {Image} from 'react-native';
import {ICONS} from '@/src/constants/image/icons';
import {MESSAGES} from '@/src/constants/Freeze/Messages';
const FreezeText = () => {
  return (
    <Box style={FreezeTextStyles.iconAndTextContainer}>
      <Image source={ICONS.I_ICON} style={FreezeTextStyles.setiIcon} />
      <Text style={FreezeTextStyles.activeText}>{MESSAGES.INFO}</Text>
    </Box>
  );
};

export default FreezeText;
