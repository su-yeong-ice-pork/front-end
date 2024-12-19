import React, {useState} from 'react';
import {Image} from 'react-native';
import {Box} from '@/components/ui/box';
import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import {INFO} from '@/src/constants/Info/Messages';
import {EMOJIS} from '@/src/constants/image/emojis';
import {CheerUpStickerStyles} from './CheerUpStickerStyles';
const Sticker = () => {
  const stickers = [
    {id: 1, key: 'sticker1', image: EMOJIS.HMM},
    {id: 2, key: 'sticker2', image: EMOJIS.SLEEPY_FACE_EMOJI},
    {id: 3, key: 'sticker3', image: EMOJIS.SMILE},
    {id: 4, key: 'sticker4', image: EMOJIS.SURPRISE},
    {id: 5, key: 'sticker5', image: EMOJIS.SWEAT},
  ];

  const [enlargedStickers, setEnlargedStickers] = useState<string[]>([]);

  return (
    <Box style={CheerUpStickerStyles.stickerSection}>
      <Text style={CheerUpStickerStyles.sectionTitle}>응원스티커</Text>
      <Box style={CheerUpStickerStyles.stickerContainer}>
        {stickers.map(sticker => (
          <Button key={sticker.id} style={[CheerUpStickerStyles.sticker]}>
            <Image
              source={sticker.image}
              style={[
                CheerUpStickerStyles.stickerImage,
                enlargedStickers.includes(sticker.key) &&
                  CheerUpStickerStyles.enlargedStickerImage,
              ]}
            />
          </Button>
        ))}
      </Box>
      <Text style={CheerUpStickerStyles.infoText}>{INFO.STICKER}</Text>
    </Box>
  );
};

export default Sticker;
