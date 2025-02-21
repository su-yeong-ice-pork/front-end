import {useState} from 'react';
import {deleteFriendApi} from '../api/deleteFriends';

const useDeleteFriend = (authToken: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteFriend = async (friendId: number): Promise<boolean> => {
    if (!authToken) {
      setError('인증 토큰이 없습니다.');
      return false;
    }
    setIsLoading(true);
    try {
      const result = await deleteFriendApi(authToken, friendId);
      if (result === null) {
        setIsLoading(false);
        return true;
      } else {
        console.error('API 에러:', result);
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      console.error('네트워크 에러:', err);
      setError('친구 삭제 실패');
      setIsLoading(false);
      return false;
    }
  };

  return {deleteFriend, isLoading, error};
};

export default useDeleteFriend;
