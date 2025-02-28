/**
 * parseTimeStringToMilliseconds
 * 주어진 "HH:MM:SS" 형식의 문자열을 밀리초(숫자)로 변환
 *
 * @param timeString "HH:MM:SS" 형식의 시간 문자열
 * @returns 해당 시간이 밀리초 단위의 숫자로 반환
 */
export const parseTimeStringToMilliseconds = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    isNaN(seconds) ||
    hours < 0 ||
    minutes < 0 ||
    seconds < 0
  ) {
    console.error('Invalid time string:', timeString);
    return 0;
  }
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

/**
 * formatMillisecondsToTimeString
 * 주어진 밀리초(숫자)를 "HH:MM:SS" 형식의 문자열로 변환
 *
 * @param milliseconds 밀리초 단위의 시간
 * @returns "HH:MM:SS" 형식의 시간 문자열
 */
export const formatMillisecondsToTimeString = (
  milliseconds: number,
): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

/**
 * formatTime
 * 밀리초 단위의 시간을 "HH:MM:SS" 형식의 문자열로 변환
 * 내부적으로 formatMillisecondsToTimeString 함수를 호출
 *
 * @param milliseconds 밀리초 단위의 시간
 * @returns "HH:MM:SS" 형식의 시간 문자열
 */
export const formatTime = (milliseconds: number): string => {
  return formatMillisecondsToTimeString(milliseconds);
};
