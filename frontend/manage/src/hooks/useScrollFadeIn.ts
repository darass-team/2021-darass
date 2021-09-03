import { useRef, useEffect } from "react";

type Direction = "up" | "down" | "left" | "right";

interface Props {
  direction?: Direction;
  duration?: number;
  delay?: number;
  threshold?: number;
}

export const useScrollFadeIn = ({ direction = "up", duration = 1, delay = 0, threshold = 0.7 }: Props) => {
  const dom = useRef(null);

  const handleDirection = (name: Direction) => {
    switch (name) {
      case "up":
        return "translate3d(0, 50%, 0)";
      case "down":
        return "translate3d(0, -50%, 0)";
      case "left":
        return "translate3d(50%, 0, 0)";
      case "right":
        return "translate3d(-50%, 0, 0)";
      default:
        return;
    }
  };

  const handleScroll: IntersectionObserverCallback = ([entry]) => {
    if (!entry.isIntersecting) return;
    if (!dom.current) return;

    const current = dom.current as unknown as HTMLElement;

    current.style.transitionProperty = "all";
    current.style.transitionDuration = `${duration}s`;
    current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
    current.style.transitionDelay = `${delay}s`;
    current.style.opacity = "1";
    current.style.transform = "translate3d(0, 0, 0)";
  };

  useEffect(() => {
    if (!dom.current) return;

    const current = dom.current as unknown as HTMLElement;

    const observer = new IntersectionObserver(handleScroll, { threshold });
    observer.observe(current);

    return () => observer && observer.disconnect();
  }, []);

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: handleDirection(direction)
    }
  };
};

export default useScrollFadeIn;
