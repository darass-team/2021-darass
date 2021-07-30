export const debounce = (callback: () => void, delay: number) => {
  let timeId: NodeJS.Timeout;

  const innerFun = () => {
    if (timeId) {
      clearTimeout(timeId);
    }

    timeId = setTimeout(callback, delay);
  };

  return innerFun;
};
