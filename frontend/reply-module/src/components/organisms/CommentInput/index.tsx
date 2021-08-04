import { FormEvent, useState } from "react";
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
  const { createComment, error: createCommentError } = useCreateComment();
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const isValidTextInput = !isEmptyString(content);
  const isValidGuestNickName = !user ? guestNickName.length > 0 : true;
  const isValidGuestPassword = !user ? guestPassword.length > 0 : true;
  const isValidFormInput = isValidTextInput && isValidGuestNickName && isValidGuestPassword;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidFormInput) {
      setFormSubmitted(true);

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
        isValidInput={!isFormSubmitted || isValidTextInput}
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
