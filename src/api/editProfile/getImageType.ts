export type DefaultImg = {
  id: number;
  url: string;
};

export type ApiResponse = {
  success: boolean;
  response: {
    profileImages: DefaultImg[];
    bannerImages?: DefaultImg[];
  };
  error: any;
};
