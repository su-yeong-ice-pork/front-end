import React from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {HStack} from '@/components/ui/hstack';
import {Button, ButtonText} from '@/components/ui/button';
import {Image} from '@/components/ui/image';
import useListViewBox from '@/src/hooks/useListViewBox';

import {ListViewBoxStyles} from './ListViewBoxStyels';
import {ListViewBoxProps} from '../types/ListViewBoxType/ListViewBoxType';
import {ListViewBoxAltMessage} from '@/src/constants/ListViewBox/ListViewBox';

const ListViewBox: React.FC<ListViewBoxProps> = ({type, count}) => {
  const {boxTitle, icon, buttonIcon, typeLabel, buttonText, description} =
    useListViewBox(type);

  return (
    <Box>
      <Box style={ListViewBoxStyles.ViewBoxTitleContainer}>
        <Text size="2xs" style={ListViewBoxStyles.ViewBoxTitle}>
          {boxTitle}
        </Text>
      </Box>

      <HStack>
        <Box style={ListViewBoxStyles.ViewBoxText}>
          <HStack style={ListViewBoxStyles.ViewBoxHStack}>
            <Box style={ListViewBoxStyles.ViewBoxIconContainer}>
              <Image
                size="2xs"
                source={icon}
                style={ListViewBoxStyles.ViewBoxIcon}
                resizeMode="contain"
                alt={ListViewBoxAltMessage.ICON}
              />
            </Box>
            <Text style={ListViewBoxStyles.ViewBoxDescription}>
              <Text bold style={ListViewBoxStyles.ViewBoxIconContainer}>
                {count}
                {typeLabel}
              </Text>
              {description}
            </Text>
          </HStack>
        </Box>

        <Button size="xs" style={ListViewBoxStyles.buttonStyle}>
          <Image
            size="2xs"
            source={buttonIcon}
            style={ListViewBoxStyles.ButtonIcon}
            resizeMode="contain"
            alt={ListViewBoxAltMessage.BUTTONICON}
          />
          <ButtonText>{buttonText}</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default ListViewBox;
