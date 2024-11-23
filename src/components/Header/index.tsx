import React from 'react';

import {HeaderStyles} from './HeaderStyles';
import {HeaderPropsType} from '../types/HeaderType/HeaderPropsType';

import {useNavigation} from '@react-navigation/native';

import {ICONS} from '@/src/constants/image/icons';
import {Box} from '@/components/ui/box';
import {Button} from '@/components/ui/button';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';

const Header = ({Title}: HeaderPropsType) => {
  const navigation = useNavigation();
  const backToPage = () => navigation.goBack();

  return (
    <Box style={HeaderStyles.headerContainer}>
      <Button style={HeaderStyles.backButtonWrapper} onPress={backToPage}>
        <Image
          source={ICONS.BACK_BUTTON}
          style={HeaderStyles.backButtonIcon}
          alt={Title}
        />
      </Button>
      <Box>
        <Text style={HeaderStyles.headerText}>{Title}</Text>
      </Box>
    </Box>
  );
};

export default Header;
