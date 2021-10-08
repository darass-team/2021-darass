import { useConfirmGuestPassword, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { User } from "@/types/user";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { CancelButton, Container, PasswordButtonWrapper, PasswordInput, SubmitButton } from "./styles";

export interface Props {
  authorId: User["id"];
  password: string;
  setPassword: (_password: string) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isSubComment: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

const PasswordForm = ({
  authorId,
  password,
  setPassword,
  onChangePassword,
  isSubComment,
  onClose,
  onSubmitSuccess,
  ...props
}: Props) => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const {
    data: isValidGuestPassword,
    refetch: refetchIsValidGuestPassword,
    reset: resetConfirmResult
  } = useConfirmGuestPassword({ guestUserId: authorId, guestUserPassword: password });

  const { setScrollHeight } = useMessageChannelFromReplyModuleContext();

  const onSubmitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    refetchIsValidGuestPassword();
  };

  const onClickCancelButton = () => {
    onClose();
    setPassword("");
    resetConfirmResult();
  };

  useEffect(() => {
    passwordInputRef.current?.focus();
    setScrollHeight();
  }, []);

  useEffect(() => {
    if (isValidGuestPassword) {
      onSubmitSuccess();
      onClose();
      resetConfirmResult();
    }
  }, [isValidGuestPassword]);

  return (
    <Container onSubmit={onSubmitPassword} {...props}>
      <PasswordInput
        ref={passwordInputRef}
        type="password"
        value={password}
        onChange={onChangePassword}
        placeholder="댓글 작성 시 입력한 비밀번호 입력"
        isValidInput={isValidGuestPassword !== false}
        data-testid="password-form-input"
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
