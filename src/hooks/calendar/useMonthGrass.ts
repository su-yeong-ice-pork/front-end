// src/hooks/useMonthGrass.ts
import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useQuery} from '@tanstack/react-query';
import grassState from '@/src/recoil/monthGrassAtom';
import authState from '@/src/recoil/authAtom';
import {getMonthGrassApi} from '@/src/api/monthGrass/getMonthGrassAPI';
import {GrassType} from '@/src/api/monthGrass/getMonthGrassType';

interface UseMonthGrassReturn {
  grass: GrassType[] | null;
  isLoading: boolean;
  error: any;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
}

const useMonthGrass = (userId: number): UseMonthGrassReturn => {
  const [grass, setGrass] = useRecoilState(grassState);
  const authInfo = useRecoilValue(authState);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const {data, isLoading, error} = useQuery({
    queryKey: ['monthGrass', userId, year, month],
    queryFn: () => getMonthGrassApi(userId, year, month, authInfo.authToken),
    enabled: !!userId && !!authInfo?.authToken,
  });

  useEffect(() => {
    if (data) {
      setGrass(data);
    }
  }, [data, setGrass]);

  return {
    grass,
    isLoading,
    error,
    setYear,
    setMonth,
  };
};

export default useMonthGrass;
