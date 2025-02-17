export type patchImageApiResponse = {
  success: boolean;
  response: null;
  error: {
    status: number;
    message: string;
  } | null;
};

export type SubmitProfileUpdateParams = {
  id: number;
  authToken: string;
  selectedProfile: string | null;
  selectedBanner?: string | null;
  isCustomImage: boolean;
  isCustomBanner: boolean;
  currentMessage?: string;
  clearProfile?: () => void;
  clearBanner?: () => void;
};
