import React from 'react';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';
import {HStack} from '@/components/ui/hstack';

import {ICONS} from '@/src/constants/image/icons';
import ErrorMessageStyles from './ErrorMessageStyles';

const ErrorMessage = ({errorMessage}) => {
  return (
    <HStack style={ErrorMessageStyles.iconAndTextContainer}>
      <Image
        source={ICONS.I_ICON}
        alt="Icon"
        style={ErrorMessageStyles.setiIcon}
      />
      <Text style={ErrorMessageStyles.activeText}>{errorMessage}</Text>
    </HStack>
  );
};

export default ErrorMessage;
