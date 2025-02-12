export type patchImageApiResponse = {
  success: boolean;
  response: null;
  error: {
    status: number;
    message: string;
  } | null;
};
