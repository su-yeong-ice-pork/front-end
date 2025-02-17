/**
 * formatTime : 남은 시간을 mm:ss 형식의 문자열로 변환
 */
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};
