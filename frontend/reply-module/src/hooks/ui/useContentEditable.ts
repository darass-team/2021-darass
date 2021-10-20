import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMessageChannelFromReplyModuleContext } from "..";

export const useContentEditable = (initialContent: string) => {
  const $contentEditable = useRef<HTMLDivElement | null>(null);
  const [content, _setContent] = useState(initialContent);
  const { setScrollHeight } = useMessageChannelFromReplyModuleContext();

  const onInput = (event: ChangeEvent<HTMLDivElement>) => {
    _setContent(event.target.innerHTML || "");
    setScrollHeight();
  };

  const setContent = (newContent: string) => {
    if ($contentEditable.current) {
      $contentEditable.current.innerHTML = newContent;
      _setContent(newContent);
    }
  };

  useEffect(() => {
    setContent(initialContent);
  }, []);

  return { content, setContent, onInput, $contentEditable };
};
