import React from 'react';
import {Dimensions} from 'react-native';
import {Box} from '@/components/ui/box';
import {Text} from '@/components/ui/text';
import {HStack} from '@/components/ui/hstack';
import {Button, ButtonText} from '@/components/ui/button';
import {Image} from '@/components/ui/image';

const IMAGES = {
  friendsIcon: require('../../../assets/images/icons/friendsIcon.png'),
  groupsIcon: require('../../../assets/images/icons/groupsIcon.png'),
  coloredFriendsIcon: require('../../../assets/images/icons/coloredFriendsIcon.png'),
  coloredGroupIcon: require('../../../assets/images/icons/coloredGroupIcon.png'),
};

const {width, height} = Dimensions.get('window');

const ListViewBox = ({
  boxTitle = '현재 나의 잔디 친구',
  friendCount = 0,
  type = 'coloredFriendsIcon',
  type2 = '명',
  buttontype = 'friendsIcon',
  buttonText = '친구목록 보기',
}) => {
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
        <Box
          style={{
            backgroundColor: '#fff',
            width: width * 0.6,
            height: height * 0.06,
            padding: 15,
            borderRadius: 8,
          }}>
          <HStack
            style={{
              alignItems: 'center',
            }}>
            <Box style={{marginRight: 6}}>
              <Image
                size="2xs"
                source={IMAGES[type]}
                style={{
                  width: 0.3,
                  height: 0.3,
                }}
                resizeMode="contain"
                alt="Friends Icon"
              />
            </Box>
            <Text style={{color: '#B6B6B6', fontSize: 12}}>
              <Text bold="true" style={{color: '#00A6AC', fontSize: 15}}>
                {friendCount}
                {type2}
              </Text>
              의 잔디친구들과 공부 중입니다!
            </Text>
          </HStack>
        </Box>

        <Button
          size="xs"
          style={{
            width: width * 0.3,
            height: height * 0.06,
            padding: 12,
            marginLeft: 10,
            borderRadius: 8,
            shadowOffset: {width: 0, height: 2},
            backgroundColor: '#009499',
          }}>
          <Image
            size="2xs"
            source={IMAGES[buttontype]}
            style={{marginRight: 4}}
            resizeMode="contain"
            alt="Friends Icon"
          />
          <ButtonText>{buttonText}</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default ListViewBox;
