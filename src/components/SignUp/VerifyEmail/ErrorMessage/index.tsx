import React from 'react';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';
import {HStack} from '@/components/ui/hstack';

import {ICONS} from '@/src/constants/image/icons';
import ErrorMessageStyles from './ErrorMessageStyles';

import {ERRORMESSAGE} from '@/src/constants/SignUp/VerifyEmail';
import {ErrorMessageProps} from '@/src/components/types/SignUpType/VerifyEmail';

const ErrorMessage = ({errorMessage}: ErrorMessageProps) => {
  return (
    <HStack style={ErrorMessageStyles.iconAndTextContainer}>
      <Image
        source={ICONS.I_ICON}
        alt={ERRORMESSAGE.IMGALT}
        style={ErrorMessageStyles.setiIcon}
      />
      <Text style={ErrorMessageStyles.activeText}>{errorMessage}</Text>
    </HStack>
  );
};

export default ErrorMessage;
