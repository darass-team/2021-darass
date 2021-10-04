import { useContentEditable } from "@/hooks";
import { focusContentEditableTextToEnd } from "@/utils/focusContentEditableTextToEnd";
import { useEffect } from "react";
import { Props } from ".";

export const useCommentTextBox = ({
  name,
  children,
  contentEditable,
  thisCommentIsWrittenByAdmin,
  isSubComment,
  resetState,
  onSubmitEditedComment
}: Props) => {
  const { content, setContent, onInput, $contentEditable } = useContentEditable(children);

  const onClickCancelButton = () => {
    setContent(children);
    resetState();
  };

  useEffect(() => {
    if (contentEditable && $contentEditable.current) {
      focusContentEditableTextToEnd($contentEditable.current);
    }
  }, [contentEditable]);

  return { $contentEditable, onInput, onClickCancelButton, content };
};
