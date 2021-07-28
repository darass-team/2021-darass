import { FormEvent, useState } from "react";
import { useCreateComment, useInput } from "../../../hooks";
import { User } from "../../../types/user";
import SubmitButton from "../../atoms/Buttons/SubmitButton";
import { Form, GuestInfo, TextArea, Wrapper } from "./styles";

export interface Props {
  user: User | undefined;
  url: string | null;
  projectSecretKey: string | null;
}

const CommentInput = ({ user, url, projectSecretKey }: Props) => {
  const { value: content, onChange: onChangeContent, setValue: setContent } = useInput("");
  const { value: guestNickName, onChange: onChangeGuestNickName, setValue: setGuestNickName } = useInput("");
  const { value: guestPassword, onChange: onChangeGuestPassword, setValue: setGuestPassword } = useInput("");
  const { createComment } = useCreateComment();
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const isValidTextInput = content.length > 0;
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
      alert("댓글 생성에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        value={content}
        onChange={onChangeContent}
        placeholder="댓글을 입력해주세요."
        isValidInput={!isFormSubmitted || isValidTextInput}
        data-testid="comment-input-textarea"
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
