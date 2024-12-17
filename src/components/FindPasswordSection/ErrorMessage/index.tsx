import React from 'react';

import {Box} from '@/components/ui/box';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';

import {ErrorMessageProps} from '../../types/FindPasswordType/MessageType';
import {ErrorMessageStyles} from './ErrorMessageStyles';

import {ICONS} from '@/src/constants/image/icons';

const ErrorMessage: React.FC<ErrorMessageProps> = ({errorMessage}) => {
  return (
    <Box style={ErrorMessageStyles.iconAndTextContainer}>
      <Image
        source={ICONS.I_ICON}
        style={ErrorMessageStyles.setiIcon}
        alt={errorMessage}
      />
      <Text style={ErrorMessageStyles.activeText}>{errorMessage}</Text>
    </Box>
  );
};
export default ErrorMessage;
