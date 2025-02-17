// src/utils/calendarUtils.ts
export const getColorForActivity = (studyTime: number): string => {
  if (studyTime === 0) return '#DCE1CB';
  else if (studyTime >= 1 && studyTime <= 2) return '#c6e48b';
  else if (studyTime >= 3 && studyTime <= 4) return '#7bc96f';
  else if (studyTime >= 5 && studyTime <= 6) return '#239a3b';
  else if (studyTime >= 7 && studyTime <= 8) return '#196127';
  else return '#196127';
};

export const getColorForDate = (
  date: Date,
  grassData: {[date: string]: {studyTime: number}},
  startDate: Date,
): string => {
  if (date < startDate) return '#ebedf0';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const key = `${year}-${month}-${day}`;
  const entry = grassData[key];
  if (!entry) return '#ebedf0';

  return getColorForActivity(entry.studyTime);
};
