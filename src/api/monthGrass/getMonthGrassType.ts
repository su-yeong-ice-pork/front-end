export type GrassType = {
  id: number;
  day: number;
  studyHour: number;
  grassScore: number;
};

export type GrassApiResponse = {
  success: boolean;
  response: {
    year: number;
    month: number;
    grass: GrassType[];
  } | null;
  error: any;
};

export type Grass = GrassType[];
