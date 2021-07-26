const TIME_TABLE_BY_MILLISECOND = {
  SEC: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 12 * 30 * 24 * 60 * 60 * 1000
};

export const getTimeDifference = (targetTime: string) => {
  const formattedTargetTime = new Date(targetTime);
  const currTime = new Date();

  const diff = currTime.getTime() - formattedTargetTime.getTime();

  if (diff < TIME_TABLE_BY_MILLISECOND.MINUTE) return `방금 전`;
  else if (diff < TIME_TABLE_BY_MILLISECOND.HOUR) return `${Math.floor(diff / TIME_TABLE_BY_MILLISECOND.MINUTE)}분 전`;
  else if (diff < TIME_TABLE_BY_MILLISECOND.DAY) return `${Math.floor(diff / TIME_TABLE_BY_MILLISECOND.HOUR)}시간 전`;
  else if (diff < TIME_TABLE_BY_MILLISECOND.WEEK) return `${Math.floor(diff / TIME_TABLE_BY_MILLISECOND.DAY)}일 전`;
  else if (diff < TIME_TABLE_BY_MILLISECOND.MONTH) return `${Math.floor(diff / TIME_TABLE_BY_MILLISECOND.WEEK)}주 전`;
  else if (diff < TIME_TABLE_BY_MILLISECOND.YEAR) return `${Math.floor(diff / TIME_TABLE_BY_MILLISECOND.MONTH)}개월 전`;
  else return `${Math.floor(Math.floor(diff / TIME_TABLE_BY_MILLISECOND.YEAR))}년 전`;
};
