import CheckBox from "@/components/@atoms/CheckBox";
import SubmitButton from "@/components/@atoms/SubmitButton";
import { useTextArea } from "@/hooks";
import { Comment } from "@/types";
import { User } from "@/types/user";
import { parseLinkTextToHTML, resizeTextArea } from "@/utils/dom";
import { useEffect, useState } from "react";
import { ButtonWrapper, CancelButton, Container, Name, Text } from "./styles";

export interface Props {
  name: User["nickName"];
  children: Comment["content"];
  contentEditable?: boolean;
  thisCommentIsWrittenByAdmin: boolean;
  isSubComment: boolean;
  isSecretComment: boolean;
  isReadable: boolean;
  thisCommentIsWrittenByGuest: boolean;
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
  isReadable,
  thisCommentIsWrittenByGuest,
  resetState,
  onSubmitEditedComment
}: Props) => {
  const { content, setContent, onChangeTextArea, textAreaRef } = useTextArea(children);

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
    if (textAreaRef.current) resizeTextArea(textAreaRef.current);
  }, [contentEditable]);

  return (
    <Container isSubComment={isSubComment}>
      <Name
        thisCommentIsWrittenByAdmin={thisCommentIsWrittenByAdmin}
        isSecretComment={isSecretComment}
        isReadable={isReadable}
      >
        {thisCommentIsWrittenByGuest || isReadable ? name : "익명"}
      </Name>
      {contentEditable ? (
        <Text
          ref={textAreaRef}
          value={content}
          readOnly={!contentEditable}
          disabled={!contentEditable}
          editable={contentEditable}
          isSecretComment={isSecretComment}
          isSubComment={isSubComment}
          isReadable={isReadable}
          onChange={onChangeTextArea}
          data-testid="comment-text-box-contenteditable-input"
        />
      ) : (
        <Text
          as="span"
          isSubComment={isSubComment}
          editable={contentEditable}
          isSecretComment={isSecretComment}
          isReadable={isReadable}
          dangerouslySetInnerHTML={{ __html: parseLinkTextToHTML(content) }}
        />
      )}

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
