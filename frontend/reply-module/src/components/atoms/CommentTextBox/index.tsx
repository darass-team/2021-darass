import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useContentEditable } from "../../../hooks";
import { Comment } from "../../../types";
import { User } from "../../../types/user";
import { focusContentEditableTextToEnd } from "../../../utils/focusContentEditableTextToEnd";
import { SubmitButton, Container, Name, Text, CancelButton, ButtonWrapper } from "./styles";

export interface Props {
  name: User["nickName"];
  children: Comment["content"];
  contentEditable?: boolean;
  clear: () => void;
  onSubmitEditedComment: (content: Comment["content"]) => void;
}

const CommentTextBox = ({ name, children, contentEditable = false, clear, onSubmitEditedComment }: Props) => {
  const { content, setContent, onInput } = useContentEditable(children);
  const $text = useRef<HTMLDivElement>(null);

  const cancelEdit = () => {
    setContent(children);
    clear();
  };

  useEffect(() => {
    if (contentEditable && $text.current) {
      focusContentEditableTextToEnd($text.current);
    }
  }, [contentEditable]);

  return (
    <Container>
      <Name>{name}</Name>
      <Text
        ref={$text}
        contentEditable={contentEditable}
        suppressContentEditableWarning={true}
        onInput={onInput}
        data-testid="comment-text-box-contenteditable-input"
      >
        {content}
      </Text>
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
