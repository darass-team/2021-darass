import { useEffect } from "react";
import { useContentEditable } from "@/hooks";
import { Comment } from "@/types";
import { User } from "@/types/user";
import { focusContentEditableTextToEnd } from "@/utils/focusContentEditableTextToEnd";
import SubmitButton from "@/components/atoms/Buttons/SubmitButton";
import { Container, Name, Text, CancelButton, ButtonWrapper } from "./styles";

export interface Props {
  name: User["nickName"];
  children: Comment["content"];
  contentEditable?: boolean;
  thisCommentIsWrittenByAdmin: boolean;
  isSubComment: boolean;
  resetState: () => void;
  onSubmitEditedComment: (content: Comment["content"]) => void;
}

const CommentTextBox = ({
  name,
  children,
  contentEditable = false,
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

  return (
    <Container isSubComment={isSubComment}>
      <Name thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}>{name}</Name>
      <Text
        ref={$contentEditable}
        contentEditable={contentEditable}
        isSubComment={isSubComment}
        suppressContentEditableWarning={true}
        onInput={onInput}
        data-testid="comment-text-box-contenteditable-input"
      />
      {contentEditable && (
        <ButtonWrapper>
          <CancelButton onClick={onClickCancelButton}>취소</CancelButton>
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