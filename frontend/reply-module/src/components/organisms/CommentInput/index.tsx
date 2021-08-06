import { FormEvent, useState } from "react";
import {
  GUEST_NICKNAME_MAX_LENGTH,
  GUEST_NICKNAME_MIN_LENGTH,
  GUEST_PASSWORD_MAX_LENGTH,
  GUEST_PASSWORD_MIN_LENGTH,
  MAX_COMMENT_INPUT_LENGTH
} from "../../../constants/comment";
import { getErrorMessage } from "../../../utils/errorMessage";
import { useContentEditable, useCreateComment, useInput } from "../../../hooks";
import { User } from "../../../types/user";
import { AlertError } from "../../../utils/Error";
import { isEmptyString } from "../../../utils/isEmptyString";
import { postAlertMessage } from "../../../utils/postMessage";
import SubmitButton from "../../atoms/Buttons/SubmitButton";
import { Form, GuestInfo, TextBox, Wrapper } from "./styles";

export interface Props {
  user: User | undefined;
  url: string | null;
  projectSecretKey: string | null;
}

const CommentInput = ({ user, url, projectSecretKey }: Props) => {
  const { content, setContent, onInput, $contentEditable } = useContentEditable("");
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

      await createComment({ content, url, projectSecretKey, ...guestInfo });
      setContent("");
      setGuestNickName("");
      setGuestPassword("");
    } catch (error) {
      if (error instanceof AlertError) {
        postAlertMessage(error.message);
      }
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextBox
        ref={$contentEditable}
        contentEditable={true}
        onInput={onInput}
        isValidInput={!isFormSubmitted || isValidCommentInput}
        data-testid="comment-input-text-box"
      />

      <Wrapper>
        {!user && (
          <div>
            <GuestInfo
              type="text"
              placeholder="이름"
              value={guestNickName}
              onChange={onChangeGuestNickName}
              isValidInput={!isFormSubmitted || isValidGuestNickName}
              data-testid="comment-input-guest-name"
            />
            <GuestInfo
              type="password"
              placeholder="비밀번호"
              value={guestPassword}
              onChange={onChangeGuestPassword}
              isValidInput={!isFormSubmitted || isValidGuestPassword}
              data-testid="comment-input-guest-password"
            />
          </div>
        )}
        <SubmitButton>등록</SubmitButton>
      </Wrapper>
    </Form>
  );
};

export default CommentInput;
