import React from 'react';
import {Image, Alert} from 'react-native';
import {Box} from '@/components/ui/box';
import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import {INFO} from '@/src/constants/Info/Messages';
import {EMOJIS} from '@/src/constants/image/emojis';
import {CheerUpStickerStyles} from './CheerUpStickerStyles';
import {OtherUsersProps} from '@/src/api/otherUsers/getOtherUsersTypes';
import {useRecoilValue, useRecoilState} from 'recoil';
import authState from '@/src/recoil/authAtom';
import {setFriendEmojiApi} from '@/src/api/sticker/sendStickerAPI';
import {enlargedStickersAtom} from '@/src/recoil/enlargedStickerAtom';
import {stickerRequestCountAtom} from '@/src/recoil/enlargedStickerAtom';

const Sticker: React.FC<OtherUsersProps> = ({otherMember: user}) => {
  const stickers = [
    {id: 1, key: 'sticker1', image: EMOJIS.HMM},
    {id: 2, key: 'sticker2', image: EMOJIS.SLEEPY_FACE_EMOJI},
    {id: 3, key: 'sticker3', image: EMOJIS.SMILE},
    {id: 4, key: 'sticker4', image: EMOJIS.SURPRISE},
    {id: 5, key: 'sticker5', image: EMOJIS.SWEAT},
  ];

  const [enlargedStickers, setEnlargedStickers] =
    useRecoilState(enlargedStickersAtom);
  const [requestCount, setRequestCount] = useRecoilState(
    stickerRequestCountAtom,
  );
  const authInfo = useRecoilValue(authState);

  const handlePressSticker = async (stickerId: number, stickerKey: string) => {
    if (requestCount >= 2) {
      Alert.alert('경고', '스티커는 하루 두개씩 가능합니다');
      return;
    }
    try {
      const result = await setFriendEmojiApi(
        authInfo.authToken,
        user.id,
        stickerId,
      );
      if (result.success) {
        console.log('친구 이모티콘 설정 성공');
        setEnlargedStickers(prev => [...prev, stickerKey]);
        setRequestCount(prev => prev + 1);
      } else {
        console.error('친구 이모티콘 설정 실패:', result.error);
      }
    } catch (error) {
      console.error('API 호출 중 에러 발생:', error);
    }
  };

  return (
    <Box style={CheerUpStickerStyles.stickerSection}>
      <Text style={CheerUpStickerStyles.sectionTitle}>응원스티커</Text>
      <Box style={CheerUpStickerStyles.stickerContainer}>
        {stickers.map(sticker => (
          <Button
            key={sticker.id}
            style={CheerUpStickerStyles.sticker}
            onPress={() => handlePressSticker(sticker.id, sticker.key)}
            disabled={requestCount >= 2}>
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
