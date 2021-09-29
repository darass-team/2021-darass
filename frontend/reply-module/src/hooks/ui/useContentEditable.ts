import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { messageFromReplyModule } from "../../utils/postMessage";

export const useContentEditable = (initialContent: string) => {
  const $contentEditable = useRef<HTMLDivElement | null>(null);
  const [content, _setContent] = useState(initialContent);
  const { port } = useContext(MessageChannelContext);

  const onInput = (event: ChangeEvent<HTMLDivElement>) => {
    _setContent(event.target.textContent || "");
    messageFromReplyModule(port).setScrollHeight();
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
