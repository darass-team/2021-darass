import SubmitButton from "@/components/@atoms/SubmitButton";
import { useContentEditable } from "@/hooks";
import { Comment } from "@/types";
import { User } from "@/types/user";
import { focusContentEditableTextToEnd } from "@/utils/focusContentEditableTextToEnd";
import { useEffect } from "react";
import { ButtonWrapper, CancelButton, Container, Name, Text } from "./styles";

export interface Props {
  name: User["nickName"];
  children: Comment["content"];
  contentEditable?: boolean;
  thisCommentIsWrittenByAdmin: boolean;
  isSubComment: boolean;
  isSecretComment: boolean;
  resetState: () => void;
  onSubmitEditedComment: (content: Comment["content"]) => void;
}

const CommentTextBox = ({
  name,
  children,
  contentEditable = false,
  thisCommentIsWrittenByAdmin,
  isSubComment,
  isSecretComment,
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
      <Name thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin} isSecretComment={isSecretComment}>
        {name}
      </Name>
      <Text
        ref={$contentEditable}
        contentEditable={contentEditable}
        isSecretComment={isSecretComment}
        isSubComment={isSubComment}
        suppressContentEditableWarning={true}
        onInput={onInput}
        data-testid="comment-text-box-contenteditable-input"
      />
      {contentEditable && (
        <ButtonWrapper>
          <CancelButton onClick={onClickCancelButton} data-testid="comment-text-box-cancel-button">
            취소
          </CancelButton>
          <SubmitButton
            type="button"
            disabled={content.length === 0}
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
