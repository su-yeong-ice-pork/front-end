// /src/utils/grassUtils.ts
export const transformGrassData = (grass: any, displayedDate: string): any => {
  const dateObj = new Date(displayedDate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  let newGrassData: {[date: string]: {studyTime: number; grassScore: number}} =
    {};

  grass.forEach((record: any) => {
    const dateKey = `${year}-${month < 10 ? `0${month}` : month}-${
      record.day < 10 ? `0${record.day}` : record.day
    }`;
    newGrassData[dateKey] = {
      studyTime: record.studyHour,
      grassScore: record.grassScore,
    };
  });
  return newGrassData;
};
