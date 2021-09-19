import { ChangeEvent, useEffect, useRef, useState } from "react";
import { postScrollHeightToParentWindow } from "../../utils/postMessage";

export const useContentEditable = (initialContent: string) => {
  const $contentEditable = useRef<HTMLDivElement | null>(null);
  const [content, _setContent] = useState(initialContent);

  const onInput = (event: ChangeEvent<HTMLDivElement>) => {
    _setContent(event.target.textContent || "");
    postScrollHeightToParentWindow();
  };

  const setContent = (newContent: string) => {
    if ($contentEditable.current) {
      $contentEditable.current.textContent = newContent;
      _setContent(newContent);
    }
  };

  useEffect(() => {
    setContent(initialContent);
  }, []);

  return { content, setContent, onInput, $contentEditable };
};
