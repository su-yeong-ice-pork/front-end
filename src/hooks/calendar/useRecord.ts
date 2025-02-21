// src/hooks/useRecord.ts
import {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import authState from '@/src/recoil/authAtom';
import {useRecoilValue} from 'recoil';
import {getRecordDataApi} from '@/src/api/record/getRecordDataApi';
import {RecordType} from '@/src/api/record/getRecordDataType';

interface UseRecordReturn {
  record: RecordType[] | null;
  isLoading: boolean;
  error: any;
}

const useRecord = (userId: number): UseRecordReturn => {
  const [record, setRecord] = useState<RecordType[] | null>(null);
  const authInfo = useRecoilValue(authState);

  const {data, isLoading, error} = useQuery({
    queryKey: ['record', userId],
    queryFn: () => getRecordDataApi(userId, authInfo.authToken),
    enabled: !!userId && !!authInfo?.authToken,
  });

  useEffect(() => {
    if (data) {
      setRecord(data);
    }
  }, [data]);

  return {
    record,
    isLoading,
    error,
  };
};

export default useRecord;
