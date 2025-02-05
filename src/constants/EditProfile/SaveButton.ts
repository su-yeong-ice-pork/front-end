export type SaveButtonProps = {
  selectedProfile: string | null;
  selectedBanner: string | null;
  isCustomImage: boolean;
  isCustomBanner: boolean;
  setSelectedImage: (value: string | null) => void;
  setSelectedBanner: (value: string | null) => void;
  setUploadSuccess: (value: boolean) => void;
  id: string;
  currentMessage: string;
  setIsLoading: (value: boolean) => void;
};
