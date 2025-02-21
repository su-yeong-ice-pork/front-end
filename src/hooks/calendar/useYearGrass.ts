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

const useYearGrass = (userId: number): UseYearGrassReturn => {
  const [grass, setGrass] = useRecoilState(yearGrassState);
  const user = useRecoilValue(userState);
  const authInfo = useRecoilValue(authState);
  console.log(grass);
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  const {
    data: dataPrevYear,
    isLoading: loadingPrevYear,
    error: errorPrevYear,
  } = useQuery({
    queryKey: ['yearGrass', userId, previousYear],
    queryFn: () => getYearGrassApi(userId, previousYear, authInfo!.authToken),
    enabled: !!user && !!authInfo?.authToken,
  });

  const {
    data: dataCurrYear,
    isLoading: loadingCurrYear,
    error: errorCurrYear,
  } = useQuery({
    queryKey: ['yearGrass', userId, currentYear],
    queryFn: () => getYearGrassApi(userId, currentYear, authInfo!.authToken),
    enabled: !!user && !!authInfo?.authToken,
  });

  useEffect(() => {
    if (dataPrevYear && dataCurrYear) {
      setGrass([...dataPrevYear, ...dataCurrYear]);
    } else if (dataPrevYear && !dataCurrYear) {
      setGrass([...dataPrevYear]);
    } else if (!dataPrevYear && dataCurrYear) {
      setGrass([...dataCurrYear]);
    }
  }, [dataPrevYear, dataCurrYear, setGrass]);

  return {
    grass,
    isLoading: loadingPrevYear || loadingCurrYear,
    error: errorPrevYear || errorCurrYear,
  };
};

export default useYearGrass;
