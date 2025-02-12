import React from 'react';
import {VStack,Box} from '@/components/ui/index.ts';
import ProfileActionButton from './ProfileActionButton';
import {BUTTON_TEXT} from "@/src/constants/Profile/ProfileAction.ts";
import {ProfileActionStyles} from "@/src/components/ProfileAction/ProfileActionStyle.ts";

const ProfileAction = () => {
  return (
    <VStack style={ProfileActionStyles.buttonContainer}>
      <ProfileActionButton imageType="changePassword" text={BUTTON_TEXT.CHANGE_PASSWORD}/>
      <Box style={ProfileActionStyles.separator} />
      <ProfileActionButton imageType="logoutIcon" text={BUTTON_TEXT.LOGOUT}/>
    </VStack>
  );
};

export default ProfileAction;
