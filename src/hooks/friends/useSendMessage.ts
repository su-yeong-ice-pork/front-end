import {useMutation} from '@tanstack/react-query';
import {sendCheerMessageApi} from '@/src/api/cheerMessage/sendCheerMessageAPI';
import {SendCheerMessageResponseType} from '@/src/api/cheerMessage/sendCheerMessageType';

const useSendCheerMessage = (friendId: number, authToken: string) => {
  return useMutation<SendCheerMessageResponseType | null, Error, string>({
    mutationFn: (message: string) =>
      sendCheerMessageApi(friendId, message, authToken),
  });
};

export default useSendCheerMessage;
