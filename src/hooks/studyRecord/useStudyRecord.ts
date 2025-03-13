import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getStudyTime} from '@/src/api/studyRecord/getStudyTime';
import {getTodayAttendance} from '@/src/api/studyRecord/getTodayAttendance';
import {updateStudyTime} from '@/src/api/studyRecord/updateStudyTime';
import {
  ApiResponse,
  StudyTimeResponse,
  AttendanceResponse,
  UpdateStudyTimePayload,
} from '@/src/api/studyRecord/types';

export const useStudyTime = (token: string) => {
  const studyTimeQuery = useQuery<StudyTimeResponse>({
    queryKey: ['studyTime'],
    queryFn: async () => {
      const res: ApiResponse<StudyTimeResponse> = await getStudyTime(token);
      return res.response;
    },
    enabled: !!token,
  });

  const todayAttendanceQuery = useQuery<AttendanceResponse>({
    queryKey: ['todayAttendance'],
    queryFn: async () => {
      const res: ApiResponse<AttendanceResponse> = await getTodayAttendance(
        token,
      );
      return res.response;
    },
    enabled: !!token,
  });

  return {
    studyTime: studyTimeQuery.data, // { todayStudyTime, totalStudyTime }
    todayAttendance: todayAttendanceQuery.data,
    isLoading: studyTimeQuery.isLoading || todayAttendanceQuery.isLoading,
    error: studyTimeQuery.error || todayAttendanceQuery.error,
    refetchStudyTime: studyTimeQuery.refetch,
    refetchTodayAttendance: todayAttendanceQuery.refetch,
  };
};

export const useStudyTimeForm = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    StudyTimeResponse,
    Error,
    UpdateStudyTimePayload
  >({
    mutationFn: async (newData: UpdateStudyTimePayload) => {
      const res: ApiResponse<StudyTimeResponse> = await updateStudyTime(
        newData,
        token,
      );
      return res.response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['studyTime']});
      queryClient.invalidateQueries({queryKey: ['todayAttendance']});
    },
  });

  return {
    updateStudyTime: mutation.mutate,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
