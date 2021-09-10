import { useRef, useEffect } from "react";

type Direction = "up" | "down" | "left" | "right";

type FadeType = "in" | "out" | "both";

interface Props {
  direction?: Direction;
  duration?: number;
  delay?: number;
  threshold?: number;
  fadeType?: FadeType;
}

export const useScrollFadeInOut = ({
  direction = "up",
  duration = 1,
  delay = 0,
  threshold = 0.7,
  fadeType = "in"
}: Props) => {
  const dom = useRef(null);

  const initTransform = () => {
    switch (direction) {
      case "up":
        return "translate3d(0, 50%, 0)";
      case "down":
        return "translate3d(0, -50%, 0)";
      case "left":
        return "translate3d(50%, 0, 0)";
      case "right":
        return "translate3d(-50%, 0, 0)";
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  const onScroll: IntersectionObserverCallback = ([entry]) => {
    if (!dom.current) return;
    const current = dom.current as unknown as HTMLElement;

    if (entry.intersectionRatio <= threshold) {
      if (fadeType === "out" || fadeType === "both") {
        current.style.transitionProperty = "all";
        current.style.transitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
        current.style.transitionDelay = `${delay}s`;
        current.style.opacity = "0";
        current.style.transform = initTransform();
      }
    } else {
      if (fadeType === "in" || fadeType === "both") {
        current.style.transitionProperty = "all";
        current.style.transitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
        current.style.transitionDelay = `${delay}s`;
        current.style.opacity = "1";
        current.style.transform = "translate3d(0, 0, 0)";
      }
    }
  };

  useEffect(() => {
    if (!dom.current) return;

    const current = dom.current as unknown as HTMLElement;

    const observer = new IntersectionObserver(onScroll, { threshold });
    observer.observe(current);

    return () => observer && observer.disconnect();
  }, []);

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: initTransform()
    }
  };
};

export default useScrollFadeInOut;
