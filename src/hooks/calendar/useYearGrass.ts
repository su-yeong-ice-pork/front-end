import {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useQuery} from '@tanstack/react-query';
import yearGrassState from '@/src/recoil/yearGrassAtom';
import userState from '@/src/recoil/userAtom';
import authState from '@/src/recoil/authAtom';
import {getYearGrassApi} from '@/src/api/yearGrass/getYearGrassAPI';
import {GrassType} from '@/src/api/yearGrass/getYearGrassType';

interface UseYearGrassReturn {
  grass: GrassType[] | null;
  isLoading: boolean;
  error: any;
}

const useYearGrass = (): UseYearGrassReturn => {
  const [grass, setGrass] = useRecoilState(yearGrassState);
  const user = useRecoilValue(userState);
  const authInfo = useRecoilValue(authState);

  // 2024년도 데이터
  const {
    data: data2024,
    isLoading: loading2024,
    error: error2024,
  } = useQuery({
    queryKey: ['yearGrass', user?.id, 2024],
    queryFn: () => getYearGrassApi(user!.id, 2024, authInfo!.authToken),
    enabled: !!user && !!authInfo?.authToken,
  });

  // 2025년도 데이터
  const {
    data: data2025,
    isLoading: loading2025,
    error: error2025,
  } = useQuery({
    queryKey: ['yearGrass', user?.id, 2025],
    queryFn: () => getYearGrassApi(user!.id, 2025, authInfo!.authToken),
    enabled: !!user && !!authInfo?.authToken,
  });

  useEffect(() => {
    // 두 해의 데이터가 모두 존재할 때 통합
    if (data2024 && data2025) {
      // 두 배열을 합쳐서 저장
      setGrass([...data2024, ...data2025]);
    }
  }, [data2024, data2025, setGrass]);

  return {
    grass,
    isLoading: loading2024 || loading2025,
    error: error2024 || error2025,
  };
};

export default useYearGrass;
