export type ChangeBannerImageProps = {
  defaultBanners: {url: string}[] | null;
  customImages: string[];
  selectedBanner: string | null;
  handleDefaultBannerSelect: (bannerUri: string) => void;
  ShowPicker: () => void;
};
