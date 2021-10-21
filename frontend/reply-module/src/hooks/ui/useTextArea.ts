import { resizeTextArea } from "@/utils/dom";
import { ChangeEvent, useRef, useState } from "react";
import { useMessageChannelFromReplyModuleContext } from "..";

export const useTextArea = (initialContent: string) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [content, setContent] = useState(initialContent);
  const { setScrollHeight } = useMessageChannelFromReplyModuleContext();

  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextArea(event.target);
    const newContent = event.target.value || "";

    setContent(newContent);
    setScrollHeight();
  };

  return { content, setContent, onChangeTextArea, textAreaRef };
};
