import { QUERY } from "@/constants/api";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { useInput } from "@/hooks";
import { GuestUserConfirmInfo, Comment } from "@/types/comment";
import { messageFromReplyModule } from "@/utils/postMessage";
import { request } from "@/utils/request";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Container, PasswordInput, PasswordButtonWrapper, SubmitButton, CancelButton } from "./styles";

const confirmGuestPassword = async ({ guestUserId, guestUserPassword }: GuestUserConfirmInfo) => {
  try {
    const response = await request.get(QUERY.CHECK_GUEST_PASSWORD({ guestUserId, guestUserPassword }));
    const isCorrectPassword = response.data.isCorrectPassword;

    return isCorrectPassword;
  } catch (error) {
    return false;
  }
};

export interface Props {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  onChangePassword: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isSubComment: boolean;
  currentComment: Comment;
  resetState: () => void;
}

const PasswordForm = ({ password, setPassword, onChangePassword, isSubComment, currentComment, resetState }: Props) => {
  const [isPasswordSubmitted, setPasswordSubmitted] = useState(false);
  const { port } = useContext(MessageChannelContext);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const onSubmitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidPassword = await confirmGuestPassword({});

    if (!isValidPassword) {
      messageFromReplyModule(port).openAlert("비밀번호가 일치하지 않습니다.");

      return;
    } else {
      setPasswordSubmitted(true);
    }
  };

  const onClickCancelButton = () => {
    resetState();
    setPassword("");
    setPasswordSubmitted(false);
  };

  useEffect(() => {
    passwordInputRef.current?.focus();
    messageFromReplyModule(port).setScrollHeight();
  }, []);

  return (
    <Container isSubComment={isSubComment} onSubmit={onSubmitPassword}>
      <PasswordInput
        ref={passwordInputRef}
        type="password"
        value={password}
        onChange={onChangePassword}
        placeholder="댓글 작성 시 입력한 비밀번호 입력"
        isValidInput={!isPasswordSubmitted}
        data-testid="comment-guest-password-input"
      />
      <PasswordButtonWrapper>
        <CancelButton onClick={onClickCancelButton} data-testid="comment-guest-password-cancel-button">
          취소
        </CancelButton>
        <SubmitButton data-testid="comment-guest-password-submit-button">입력</SubmitButton>
      </PasswordButtonWrapper>
    </Container>
  );
};

export default PasswordForm;
