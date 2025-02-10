export type GrassType = {
  id: number;
  month: number;
  day: number;
  studyHour: number;
};

export type GrassApiResponse = {
  success: boolean;
  response: {
    year: number;
    grass: GrassType[];
  } | null;
  error: any;
};

export type GrassData = {
  [date: string]: {
    studyTime: number;
  };
};

export type YearlyCalendarProps = {
  memberId: number;
  onLoadComplete: () => void;
};

export type MonthLabel = {
  index: number;
  month: string;
};

export type Grass = GrassType[];
