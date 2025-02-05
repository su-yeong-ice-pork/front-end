import React, {useState, useEffect} from 'react';
import {Image, ScrollView} from 'react-native';
import {Text} from '@/components/ui/text';
import {Box} from '@/components/ui/box';
import {Button} from '@/components/ui/button';
import {EditProfileScreenStyles} from './ChangeProfileStyles';
import {ICONS} from '@/src/constants/image/icons';
import {STYLE} from '@/src/constants/styles/style/style';
import {ChangeProfileImageProps} from '@/src/constants/EditProfile/ChangeProfile';
const ChangeProfileImage: React.FC<ChangeProfileImageProps> = ({
  defaultImages,
  customImages,
  selectedImage,
  handleDefaultImageSelect,
  ShowPicker,
}) => {
  return (
    <Box style={EditProfileScreenStyles.changeContainer}>
      <Text style={EditProfileScreenStyles.textStyle}>프로필 사진 변경</Text>
      <Box style={EditProfileScreenStyles.imageBox}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Button
            onPress={ShowPicker}
            style={EditProfileScreenStyles.buttonStyle}>
            <Image
              source={ICONS.PLUS_CIRCLE}
              style={EditProfileScreenStyles.chooseImageStyle}
              resizeMode={STYLE.RESIZEMODE}
            />
          </Button>
          {customImages &&
            customImages.map((imageUri, idx) => {
              const isSelected = selectedImage === imageUri;
              return (
                <Button
                  key={`custom-${idx}`}
                  onPress={() => handleDefaultImageSelect(imageUri)}
                  style={EditProfileScreenStyles.buttonStyle}>
                  <Box
                    style={[
                      EditProfileScreenStyles.imageContainer,
                      isSelected && EditProfileScreenStyles.selectedImageBorder,
                    ]}>
                    <Image
                      source={{uri: imageUri}}
                      style={EditProfileScreenStyles.defaultImageStyle}
                      resizeMode={STYLE.RESIZEMODE}
                    />
                  </Box>
                </Button>
              );
            })}
          {defaultImages &&
            defaultImages.map((image, idx) => {
              const isSelected = selectedImage === image.url;
              return (
                <Button
                  key={idx}
                  onPress={() => handleDefaultImageSelect(image.url)}
                  style={EditProfileScreenStyles.buttonStyle}>
                  <Box
                    style={[
                      EditProfileScreenStyles.imageContainer,
                      isSelected && EditProfileScreenStyles.selectedImageBorder,
                    ]}>
                    <Image
                      source={{uri: image.url}}
                      style={EditProfileScreenStyles.defaultImageStyle}
                      resizeMode={STYLE.RESIZEMODE}
                    />
                  </Box>
                </Button>
              );
            })}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default ChangeProfileImage;
