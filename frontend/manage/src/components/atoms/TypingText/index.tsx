import { useEffect, useRef, useState } from "react";
import { CursorWrapper } from "./styles";

export interface Props {
  texts: string[];
  typingSpeedMs?: number;
  changeTextSpeedMs?: number;
}

const TypingText = ({ texts, typingSpeedMs = 100, changeTextSpeedMs = 2000 }: Props) => {
  const [textsIndex, setTextsIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const pause = useRef(false);
  const reverse = useRef(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (pause.current) return;

      if (reverse.current) {
        setTextIndex(state => state - 1);
      } else {
        setTextIndex(state => state + 1);
      }
    }, typingSpeedMs);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (textIndex === texts[textsIndex].length) {
      pause.current = true;

      setTimeout(() => {
        pause.current = false;
        reverse.current = true;
      }, changeTextSpeedMs);
    }

    if (textIndex === 0) {
      reverse.current = false;

      setTextsIndex(state => {
        return (state + 1) % texts.length;
      });
    }
  }, [textIndex]);

  return <CursorWrapper>{texts[textsIndex].slice(0, textIndex)}</CursorWrapper>;
};

export default TypingText;
