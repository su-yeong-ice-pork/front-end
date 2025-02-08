import React from 'react';
import {Image, ScrollView} from 'react-native';
import {Text, Box} from '@/components/ui';
import {Button} from '@/components/ui/button';
import {ICONS} from '@/src/constants/image/icons';
import {ChangeBannerStyles} from './ChangeBannerStyles';
import {ChangeBannerImageProps} from '@/src/constants/EditProfile/ChangeBanner';
import {CHANGE_BANNER_TITLE} from '@/src/constants/EditProfile/Message';

const ChangeBannerImage: React.FC<ChangeBannerImageProps> = ({
  defaultBanners,
  customImages,
  selectedBanner,
  handleDefaultBannerSelect,
  ShowPicker,
}) => {
  return (
    <Box style={ChangeBannerStyles.changeContainer}>
      <Text style={ChangeBannerStyles.textStyle}>{CHANGE_BANNER_TITLE}</Text>
      <Box style={ChangeBannerStyles.imageBox}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Button onPress={ShowPicker} style={ChangeBannerStyles.buttonStyle}>
            <Image
              source={ICONS.PLUS_SQUARE}
              style={ChangeBannerStyles.chooseImageStyle}
              resizeMode="contain"
            />
          </Button>
          {customImages &&
            customImages.map((imageUri, idx) => {
              const isSelected = selectedBanner === imageUri;
              return (
                <Button
                  key={`custom-${idx}`}
                  onPress={() => handleDefaultBannerSelect(imageUri)}
                  style={ChangeBannerStyles.buttonStyle}>
                  <Box
                    style={[
                      ChangeBannerStyles.bannerContainer,
                      isSelected && ChangeBannerStyles.selectedBannerBorder,
                    ]}>
                    <Image
                      source={{uri: imageUri}}
                      style={ChangeBannerStyles.defaultBannerStyle}
                    />
                  </Box>
                </Button>
              );
            })}
          {defaultBanners &&
            defaultBanners.map((banner, idx) => {
              const isSelected = selectedBanner === banner.url;
              return (
                <Button
                  key={idx}
                  onPress={() => handleDefaultBannerSelect(banner.url)}
                  style={ChangeBannerStyles.buttonStyle}>
                  <Box
                    style={[
                      ChangeBannerStyles.bannerContainer,
                      isSelected && ChangeBannerStyles.selectedBannerBorder,
                    ]}>
                    <Image
                      source={{uri: banner.url}}
                      style={ChangeBannerStyles.defaultBannerStyle}
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

export default ChangeBannerImage;
