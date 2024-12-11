import apiClient from './axiosInstance';

interface LeaveAccountResponse {
  success: boolean;
  response: null;
  error: null;
}

export const CancelAccount = async (
  authToken: string,
  password: string,
): Promise<LeaveAccountResponse | null> => {
  try {
    const response = await apiClient.delete<LeaveAccountResponse>('/members', {
      headers: {
        Authorization: authToken,
      },
      data: {
        password: password,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    return null;
  }
};
