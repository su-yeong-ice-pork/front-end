import {atom} from 'recoil';
import {RecordType} from '../api/record/getRecordDataType';

const recordState = atom<RecordType[] | null>({
  key: 'recordState',
  default: null,
});

export default recordState;
