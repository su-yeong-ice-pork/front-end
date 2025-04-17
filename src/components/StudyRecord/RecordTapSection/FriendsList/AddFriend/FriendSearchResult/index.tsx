import React from 'react';
import {Box, HStack, Image, Text} from '@/components/ui';
import {ILLUSTRATIONS} from '@/src/constants/image/illustrations';
import {FriendSearchResultStyles} from './FriendSearchResultStyles';
import {Button, ButtonText} from '@/components/ui/button';
import {FriendSearchProps} from '@/src/components/types/StudyDetailType/FriendsType/FriendsListType';
import {FRIEND_SEARCH_RESULT} from '@/src/constants/StudyDetail/studyDetail';

const FriendSearchResult: React.FC<FriendSearchProps> = ({friendData = {}}) => {
  const handleAddFriend = () => {
    // 친구 추가 post 요청
  };
  return (
    <Box style={FriendSearchResultStyles.boxContainer}>
      <HStack style={FriendSearchResultStyles.container}>
        <Image
          source={
            friendData.profileImage
              ? {uri: friendData.profileImage}
              : ILLUSTRATIONS.PROFILE_IMAGE2
          }
          style={FriendSearchResultStyles.profileImage}
          alt={FRIEND_SEARCH_RESULT.PROFILE_IMG_ALT}
        />
        <Text style={FriendSearchResultStyles.profileText}>
          {friendData.name}
        </Text>
        <Button
          style={FriendSearchResultStyles.inviteButton}
          onPress={handleAddFriend}>
          <ButtonText>{FRIEND_SEARCH_RESULT.FRIEND_ADD_BUTTON}</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default FriendSearchResult;
