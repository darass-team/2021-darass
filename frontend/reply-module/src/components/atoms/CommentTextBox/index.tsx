import { useEffect } from "react";
import { useContentEditable } from "../../../hooks";
import { Comment } from "../../../types";
import { User } from "../../../types/user";
import { focusContentEditableTextToEnd } from "../../../utils/focusContentEditableTextToEnd";
import { SubmitButton, Container, Name, Text, CancelButton, ButtonWrapper } from "./styles";

export interface Props {
  name: User["nickName"];
  children: Comment["content"];
  contentEditable?: boolean;
  thisCommentIsWrittenByAdmin: boolean;
  isNestedComment: boolean;
  clear: () => void;
  onSubmitEditedComment: (content: Comment["content"]) => void;
}

const CommentTextBox = ({
  name,
  children,
  contentEditable = false,
  thisCommentIsWrittenByAdmin,
  isNestedComment,
  clear,
  onSubmitEditedComment
}: Props) => {
  const { content, setContent, onInput, $contentEditable } = useContentEditable(children);

  const cancelEdit = () => {
    setContent(children);
    clear();
  };

  useEffect(() => {
    if (contentEditable && $contentEditable.current) {
      focusContentEditableTextToEnd($contentEditable.current);
    }
  }, [contentEditable]);

  return (
    <Container isNestedComment={isNestedComment}>
      <Name thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}>{name}</Name>
      <Text
        ref={$contentEditable}
        contentEditable={contentEditable}
        isNestedComment={isNestedComment}
        suppressContentEditableWarning={true}
        onInput={onInput}
        data-testid="comment-text-box-contenteditable-input"
      />
      {contentEditable && (
        <ButtonWrapper>
          <CancelButton onClick={cancelEdit}>취소</CancelButton>
          <SubmitButton
            type="button"
            onClick={() => onSubmitEditedComment(content)}
            data-testid="comment-text-box-submit-button"
          >
            등록
          </SubmitButton>
        </ButtonWrapper>
      )}
    </Container>
  );
};

export default CommentTextBox;
