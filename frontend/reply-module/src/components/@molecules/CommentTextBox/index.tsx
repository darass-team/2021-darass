import CheckBox from "@/components/@atoms/CheckBox";
import SubmitButton from "@/components/@atoms/SubmitButton";
import { useContentEditable } from "@/hooks";
import { Comment } from "@/types";
import { User } from "@/types/user";
import { focusContentEditableTextToEnd } from "@/utils/focusContentEditableTextToEnd";
import { useEffect, useState } from "react";
import { ButtonWrapper, CancelButton, Container, Name, Text } from "./styles";

export interface Props {
  name: User["nickName"];
  children: Comment["content"];
  contentEditable?: boolean;
  thisCommentIsWrittenByAdmin: boolean;
  isSubComment: boolean;
  isSecretComment: boolean;
  resetState: () => void;
  onSubmitEditedComment: ({ content, secret }: { content: Comment["content"]; secret: boolean }) => void;
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

  const [secretMode, setSecretMode] = useState(isSecretComment);

  const onClickSecretModeCheckbox = () => {
    setSecretMode(state => !state);
  };

  const onClickCancelButton = () => {
    setContent(children);
    setSecretMode(isSecretComment);
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
          <CheckBox isChecked={secretMode} onChange={onClickSecretModeCheckbox} labelText="비밀글" />

          <CancelButton onClick={onClickCancelButton} data-testid="comment-text-box-cancel-button">
            취소
          </CancelButton>

          <SubmitButton
            type="button"
            disabled={content.length === 0}
            onClick={() => onSubmitEditedComment({ content, secret: secretMode })}
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
