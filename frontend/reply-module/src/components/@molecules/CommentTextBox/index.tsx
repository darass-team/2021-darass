import CheckBox from "@/components/@atoms/CheckBox";
import SubmitButton from "@/components/@atoms/SubmitButton";
import { useTextArea } from "@/hooks";
import { Comment } from "@/types";
import { User } from "@/types/user";
import { resizeTextArea } from "@/utils/dom";
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

  function autoLink() {
    var doc = content;
    console.log(doc);

    var regURL = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)", "gi");
    var regEmail = new RegExp("([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+.[a-z0-9-]+)", "gi");

    return doc
      .replace(regURL, "<a href='$1://$2' target='_blank'>$1://$2</a>")
      .replace(regEmail, "<a href='mailto:$1'>$1</a>");
  }

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
          dangerouslySetInnerHTML={{ __html: autoLink() }}
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
