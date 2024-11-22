import React from 'react';

import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import {Image} from '@/components/ui/image';

import {BottomBarButtonStyles, getLabelStyle} from './BottomBarButtonStyles';

import {BottomBarButtonType} from '../../types/BottomBarType/BottomBarType';
import {BottomBarImages} from '../BottomBarImage/BottomBarImage';

const BottomBarButton = ({
  currentScreen,
  onPress,
  screen,
  label,
}: BottomBarButtonType) => {
  const images = BottomBarImages(currentScreen);

  return (
    <Button style={BottomBarButtonStyles.iconContainer} onPress={onPress}>
      <Image
        source={images[screen]}
        style={BottomBarButtonStyles.icon}
        alt={screen}
      />
      <Text style={getLabelStyle({currentScreen, screen})}>{label}</Text>
    </Button>
  );
};
export default BottomBarButton;
