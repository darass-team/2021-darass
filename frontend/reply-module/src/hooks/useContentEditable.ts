import { ChangeEvent, useEffect, useRef, useState } from "react";
import { postScrollHeightToParentWindow } from "../utils/iframePostMessage";

export const useContentEditable = (initialContent: string) => {
  const $contentEditable = useRef<HTMLDivElement>(null);
  const [content, _setContent] = useState(initialContent);

  const onInput = (event: ChangeEvent<HTMLDivElement>) => {
    _setContent(event.target.innerText);
    postScrollHeightToParentWindow();
  };

  const setContent = (newContent: string) => {
    if ($contentEditable.current) {
      $contentEditable.current.innerText = newContent;
      _setContent(newContent);
    }
  };

  useEffect(() => {
    setContent(initialContent);
  }, []);

  return { content, setContent, onInput, $contentEditable };
};
