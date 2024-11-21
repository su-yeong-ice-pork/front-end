import React from 'react';

import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';

import {IMAGE_ALT, ProfileImageStyles} from './ProfileImageStyles';

import {ProfileImageProps} from '@/src/components/types/StudyRecordScreenType/ProfileCardSectionType/ProfileImageType';

const ProfileImage: React.FC<ProfileImageProps> = ({
  profileImage,
  title,
  name,
}) => {
  return (
    <Box style={ProfileImageStyles.container}>
      <Image
        source={{uri: profileImage}}
        style={ProfileImageStyles.image}
        alt={IMAGE_ALT}
      />
      <Box style={ProfileImageStyles.textContainer}>
        <Text style={ProfileImageStyles.title}>{title}</Text>
        <Text style={ProfileImageStyles.name}>{name}</Text>
      </Box>
    </Box>
  );
};

export default ProfileImage;
