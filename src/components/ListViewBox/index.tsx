import React from 'react';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {HStack} from '@/components/ui/hstack';
import {Button, ButtonText} from '@/components/ui/button';
import {Image} from '@/components/ui/image';
import useListViewBox from '@/src/hooks/useListViewBox';

import {ListViewBoxStyles} from './ListViewBoxStyels';

type ListViewBoxProps = {
  type: 'friend' | 'group';
  count: number;
};

const ListViewBox: React.FC<ListViewBoxProps> = ({type, count}) => {
  const {boxTitle, icon, buttonIcon, typeLabel, buttonText, description} =
    useListViewBox(type);

  return (
    <Box>
      <Box style={{marginTop: 20, marginBottom: 5}}>
        <Text
          size="2xs"
          style={{color: '#B6B6B6', fontSize: 10, fontWeight: 'bold'}}>
          {boxTitle}
        </Text>
      </Box>

      <HStack>
        <Box style={ListViewBoxStyles.ViewBoxTitle}>
          <HStack style={{alignItems: 'center'}}>
            <Box style={{marginRight: 6}}>
              <Image
                size="2xs"
                source={icon}
                style={{
                  width: 20,
                  height: 20,
                }}
                resizeMode="contain"
                alt={`${type} Icon`}
              />
            </Box>
            <Text style={{color: '#B6B6B6', fontSize: 12}}>
              <Text bold style={{color: '#00A6AC', fontSize: 13}}>
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
            style={{marginRight: 4}}
            resizeMode="contain"
            alt={`${type} Button Icon`}
          />
          <ButtonText>{buttonText}</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default ListViewBox;
