import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMessageChannelFromReplyModuleContext } from "..";

export const useContentEditable = (initialContent: string) => {
  const $contentEditable = useRef<HTMLTextAreaElement | null>(null);
  const [content, setContent] = useState(initialContent);
  const { setScrollHeight } = useMessageChannelFromReplyModuleContext();

  const onInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "inherit";
    event.target.style.height = `${event.target.scrollHeight}px`;
    const newContent = event.target.value || "";

    setContent(newContent);

    setScrollHeight();
  };

  return { content, setContent, onInput, $contentEditable };
};
