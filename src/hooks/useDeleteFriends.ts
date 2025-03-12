import {useState} from 'react';
import {deleteFriendApi} from '../api/deleteFriends';

const useDeleteFriend = (authToken: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteFriend = async (friendId: number): Promise<boolean> => {
    if (!authToken) {
      setError('���� ��ū�� �����ϴ�.');
      return false;
    }
    setIsLoading(true);
    try {
      const result = await deleteFriendApi(authToken, friendId);
      if (result === null) {
        setIsLoading(false);
        return true;
      } else {
        console.error('API ����:', result);
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      console.error('��Ʈ��ũ ����:', err);
      setError('ģ�� ���� ����');
      setIsLoading(false);
      return false;
    }
  };

  return {deleteFriend, isLoading, error};
};

export default useDeleteFriend;
