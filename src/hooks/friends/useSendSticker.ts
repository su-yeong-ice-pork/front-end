import {useMutation, useQueryClient} from '@tanstack/react-query';
import {setFriendEmojiApi} from '@/src/api/sticker/sendStickerAPI';
import {SetFriendEmojiInput} from '@/src/api/sticker/sendStickerTypes';

const useSetFriendEmoji = (authToken: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, emojiNumber}: SetFriendEmojiInput) =>
      setFriendEmojiApi(authToken, id, emojiNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['friendEmoji']});
    },
    onError: error => {
      console.error('친구 이모티콘 설정 실패:', error);
    },
  });
};

export default useSetFriendEmoji;
