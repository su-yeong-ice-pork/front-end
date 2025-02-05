// src/hooks/useRecord.ts
import {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useQuery} from '@tanstack/react-query';
import recordState from '@/src/recoil/recordAtom';
import authState from '@/src/recoil/authAtom';
import userState from '@/src/recoil/userAtom';
import {getRecordDataApi} from '@/src/api/record/getRecordDataApi';
import {RecordType} from '@/src/api/record/getRecordDataType';

interface UseRecordReturn {
  record: RecordType[] | null;
  isLoading: boolean;
  error: any;
}

const useRecord = (): UseRecordReturn => {
  // Recoil���� record �����͸� ��������, ������Ʈ�� �� �ְ� �Ѵ�.
  const [record, setRecord] = useRecoilState(recordState);

  const authInfo = useRecoilValue(authState);
  const user = useRecoilValue(userState);

  // react-query�� record ������ ��������
  const {data, isLoading, error} = useQuery({
    queryKey: ['record', user?.id],
    queryFn: () => getRecordDataApi(user.id, authInfo.authToken),
    enabled: !!user && !!authInfo?.authToken,
  });

  useEffect(() => {
    if (data) {
      setRecord(data);
    }
  }, [data, setRecord]);

  return {
    record,
    isLoading,
    error,
  };
};

export default useRecord;
