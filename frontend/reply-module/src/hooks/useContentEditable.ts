import { ChangeEvent, useState } from "react";
import { focusContentEditableTextToEnd } from "../utils/focusContentEditableTextToEnd";

export const useContentEditable = (initialContent: string) => {
  const [content, setContent] = useState(initialContent);

  const onInput = (event: ChangeEvent<HTMLDivElement>) => {
    setContent(event.target.innerText);
    focusContentEditableTextToEnd(event.target);
  };

  return { content, setContent, onInput };
};
