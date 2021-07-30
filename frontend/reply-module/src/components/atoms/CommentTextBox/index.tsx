import React, { ChangeEvent, useState } from "react";
import { Comment } from "../../../types";
import { User } from "../../../types/user";
import { SubmitButton, Container, Name, Text, CancelButton, ButtonWrapper } from "./styles";

export interface Props {
  name: User["nickName"];
  children: Comment["content"];
  contentEditable?: boolean;
  clear: () => void;
  onSubmitEditedComment: (content: Comment["content"]) => void;
}

const CommentTextBox = React.forwardRef<HTMLDivElement, Props>(
  ({ name, children, contentEditable = false, clear, onSubmitEditedComment }, ref) => {
    const [editedContent, setEditedContent] = useState(children);
    const isValidEditedContent = editedContent.length > 0;

    return (
      <Container>
        <Name>{name}</Name>
        <Text
          ref={ref}
          contentEditable={contentEditable}
          suppressContentEditableWarning={true}
          onInput={(event: ChangeEvent<HTMLDivElement>) => {
            setEditedContent(event.target.innerText);
          }}
          data-testid="comment-text-box-contenteditable-input"
        >
          {children}
        </Text>
        {contentEditable && (
          <ButtonWrapper>
            <CancelButton onClick={clear}>취소</CancelButton>
            <SubmitButton
              type="button"
              onClick={() => onSubmitEditedComment(editedContent)}
              disabled={!isValidEditedContent}
              data-testid="comment-text-box-submit-button"
            >
              등록
            </SubmitButton>
          </ButtonWrapper>
        )}
      </Container>
    );
  }
);

export default CommentTextBox;
