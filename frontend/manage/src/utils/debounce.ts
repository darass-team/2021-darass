export const debounce = (cb: () => void, delay: number) => {
  let timeId: NodeJS.Timeout;

  const innerFun = () => {
    if (timeId) {
      clearTimeout(timeId);
    }

    timeId = setTimeout(cb, delay);
  };

  return innerFun;
};
