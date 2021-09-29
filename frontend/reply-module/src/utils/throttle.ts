interface Props {
  callback: () => void;
  delay: number;
}

const throttling = ({ callback, delay }: Props) => {
  let throttle: NodeJS.Timeout | null;

  const runThrottle = () => {
    if (!throttle) {
      throttle = setTimeout(() => {
        throttle = null;

        callback();
      }, delay);
    }
  };

  return runThrottle;
};

export default throttling;
