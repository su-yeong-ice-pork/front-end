import React, {useState} from 'react';
import {Box,Text,HStack, Image} from '@/components/ui/index.ts';
import {Button, ButtonText} from '@/components/ui/button';
import useListViewBox from '@/src/hooks/useListViewBox';

import {ListViewBoxStyles} from './ListViewBoxStyels';
import {ListViewBoxProps} from '../types/ListViewBoxType/ListViewBoxType';
import {ListViewBoxAltMessage} from '@/src/constants/ListViewBox/ListViewBox';

const ListViewBox: React.FC<ListViewBoxProps> = ({type, count,buttonOnPress}) => {
  const {boxTitle, icon, buttonIcon, typeLabel, buttonText, description} =
    useListViewBox(type);

  return (
    <Box style={ListViewBoxStyles.ViewBoxContainer}>
      <Text style={ListViewBoxStyles.ViewBoxTitle}>{boxTitle}</Text>

      <HStack>
        <HStack style={ListViewBoxStyles.ViewBoxText}>
            <Box style={ListViewBoxStyles.ViewBoxIconContainer}>
              <Image
                source={icon}
                style={ListViewBoxStyles.Icon}
                resizeMode="contain"
                alt={ListViewBoxAltMessage.ICON}
              />
            </Box>

            <Text style={ListViewBoxStyles.ViewBoxDescription}>
              <Text bold style={ListViewBoxStyles.ViewBoxIconContainer}>{count}{typeLabel}</Text>
              {description}
            </Text>
        </HStack>

        <Button style={ListViewBoxStyles.ButtonStyle}
                onPress={buttonOnPress}>
          <Image
            source={buttonIcon}
            style={ListViewBoxStyles.Icon}
            resizeMode="contain"
            alt={ListViewBoxAltMessage.BUTTONICON}
          />
          <ButtonText style={ListViewBoxStyles.ButtonText}>{buttonText}</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default ListViewBox;
