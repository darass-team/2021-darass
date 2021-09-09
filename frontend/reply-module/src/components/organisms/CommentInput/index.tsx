import { ChangeEvent, FormEvent, MutableRefObject, RefObject, useState } from "react";
import {
  GUEST_NICKNAME_MAX_LENGTH,
  GUEST_NICKNAME_MIN_LENGTH,
  GUEST_PASSWORD_MAX_LENGTH,
  GUEST_PASSWORD_MIN_LENGTH,
  MAX_COMMENT_INPUT_LENGTH
} from "../../../constants/comment";
import { useContentEditable, useCreateComment, useInput } from "../../../hooks";
import { Comment } from "../../../types";
import { User } from "../../../types/user";
import { AlertError } from "../../../utils/Error";
import { getErrorMessage } from "../../../utils/errorMessage";
import { focusContentEditableTextToEnd } from "../../../utils/focusContentEditableTextToEnd";
import { isEmptyString } from "../../../utils/isEmptyString";
import { postAlertMessage } from "../../../utils/postMessage";
import SubmitButton from "../../atoms/Buttons/SubmitButton";
import { ButtonWrapper, CancelButton, Form, GuestInfo, TextBox, TextBoxWrapper, TextCount, Wrapper } from "./styles";

export interface Props {
  className?: string;
  innerRef?: MutableRefObject<HTMLDivElement | null>;
  user: User | undefined;
  parentCommentId?: Comment["id"];
  onClose?: () => void;
}

const CommentInput = ({ className, innerRef, user, parentCommentId, onClose }: Props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const url = urlParams.get("url");
  const projectSecretKey = urlParams.get("projectKey");
  const isSubCommentInput = parentCommentId ? true : false;

  const { content, setContent, onInput: onInputContentEditable, $contentEditable } = useContentEditable("");
  const { value: guestNickName, onChange: onChangeGuestNickName, setValue: setGuestNickName } = useInput("");
  const { value: guestPassword, onChange: onChangeGuestPassword, setValue: setGuestPassword } = useInput("");
  const { createComment } = useCreateComment();
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const isValidCommentInput = !isEmptyString(content) && content.length <= MAX_COMMENT_INPUT_LENGTH;
  const isValidGuestNickName = !user
    ? GUEST_NICKNAME_MIN_LENGTH <= guestNickName.length && guestNickName.length <= GUEST_NICKNAME_MAX_LENGTH
    : true;
  const isValidGuestPassword = !user
    ? GUEST_PASSWORD_MIN_LENGTH <= guestPassword.length && guestPassword.length <= GUEST_PASSWORD_MAX_LENGTH
    : true;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isValidCommentInput) {
      postAlertMessage(getErrorMessage.commentInput(content));
      return;
    }

    if (!isValidGuestNickName) {
      postAlertMessage(getErrorMessage.guestNickName(guestNickName));
      return;
    }

    if (!isValidGuestPassword) {
      postAlertMessage(getErrorMessage.guestPassword(guestPassword));
      return;
    }

    try {
      const guestInfo = {
        guestNickName: guestNickName || undefined,
        guestPassword: guestPassword || undefined
      };

      await createComment({ content, url, projectSecretKey, ...guestInfo, parentId: parentCommentId });
      setContent("");
      setGuestNickName("");
      setGuestPassword("");
      if (onClose) onClose();
    } catch (error) {
      if (error instanceof AlertError) {
        postAlertMessage(error.message);
      }
    } finally {
      setFormSubmitted(false);
    }
  };

  const onInput = (event: ChangeEvent<HTMLDivElement>) => {
    const currentText = event.target.textContent || "";

    if (currentText.length > MAX_COMMENT_INPUT_LENGTH) {
      postAlertMessage(getErrorMessage.commentInput(currentText));
      setContent(currentText.substr(0, MAX_COMMENT_INPUT_LENGTH));

      if (!$contentEditable.current) return;
      focusContentEditableTextToEnd($contentEditable.current);

      return;
    }

    onInputContentEditable(event);
  };

  return (
    <Form
      onSubmit={onSubmit}
      className={className}
      isSubCommentInput={isSubCommentInput}
      data-testid={isSubCommentInput ? "subCommentInput" : "commentInput"}
    >
      <TextBoxWrapper>
        <TextBox
          ref={(element: HTMLDivElement) => {
            $contentEditable.current = element;
            if (!innerRef) return;
            innerRef.current = element;
          }}
          contentEditable={true}
          onInput={onInput}
          isValidInput={!isFormSubmitted || isValidCommentInput}
          data-testid="comment-input-text-box"
        />
        <TextCount>{`${content.length} / ${MAX_COMMENT_INPUT_LENGTH}`}</TextCount>
      </TextBoxWrapper>

      <Wrapper>
        {!user && (
          <div>
            <GuestInfo
              type="text"
              placeholder="이름"
              value={guestNickName}
              onChange={onChangeGuestNickName}
              isValidInput={!isFormSubmitted || isValidGuestNickName}
              isSubCommentInput={isSubCommentInput}
              data-testid="comment-input-guest-name"
            />
            <GuestInfo
              type="password"
              placeholder="비밀번호"
              value={guestPassword}
              onChange={onChangeGuestPassword}
              isValidInput={!isFormSubmitted || isValidGuestPassword}
              isSubCommentInput={isSubCommentInput}
              data-testid="comment-input-guest-password"
            />
          </div>
        )}
        <ButtonWrapper isSubCommentInput={isSubCommentInput}>
          {isSubCommentInput && <CancelButton onClick={onClose}>취소</CancelButton>}
          <SubmitButton data-testid="comment-input-submit-button">등록</SubmitButton>
        </ButtonWrapper>
      </Wrapper>
    </Form>
  );
};

export default CommentInput;
