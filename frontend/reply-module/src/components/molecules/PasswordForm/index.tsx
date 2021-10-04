import { useConfirmGuestPassword, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { User } from "@/types/user";
import { messageFromReplyModule } from "@/utils/postMessage";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { CancelButton, Container, PasswordButtonWrapper, PasswordInput, SubmitButton } from "./styles";
import { usePasswordForm } from "./usePasswordForm";

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
  const { onSubmitPassword, passwordInputRef, isValidGuestPassword, onClickCancelButton } = usePasswordForm({
    authorId,
    password,
    setPassword,
    onChangePassword,
    isSubComment,
    onClose,
    onSubmitSuccess
  });

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
