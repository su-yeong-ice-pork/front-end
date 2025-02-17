import {useState, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Friend, UseFriendsResult} from '../api/friends/getFriendsTypes';
import {getFriendsApi} from '../api/friends/getFriendsAPI';

const useFriends = (authToken: string, userId: string): UseFriendsResult => {
  const [friends, setFriends] = useState<Friend[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    data,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery<Friend[] | null>({
    queryKey: ['friends', userId],
    queryFn: () => getFriendsApi(authToken, userId),
    enabled: !!authToken && !!userId,
  });

  useEffect(() => {
    setIsLoading(queryLoading);
    if (data) {
      setFriends(data);
      console.log('친구 목록 불러오기 성공');
    }

    if (queryError) {
      console.error('친구 목록 불러오기 실패:', queryError);
      setError('친구 목록 불러오기 실패');
    }
  }, [data, queryLoading, queryError]);

  return {friends, isLoading, error};
};

export default useFriends;
