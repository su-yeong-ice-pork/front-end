export type ChangeProfileImageProps = {
  defaultImages: {url: string}[] | null;
  customImages: string[];
  selectedImage: string | null;
  handleDefaultImageSelect: (imageUri: string) => void;
  ShowPicker: () => void;
};
