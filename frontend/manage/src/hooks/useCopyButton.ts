import { useState } from "react";

export const useCopyButton = () => {
  const [isCopyButtonClicked, setCopyButtonState] = useState(false);

  const onCopy = (script: string) => {
    navigator.clipboard.writeText(script);
    setCopyButtonState(true);
  };

  return { isCopyButtonClicked, setCopyButtonState, onCopy };
};
