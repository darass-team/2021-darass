import { useConfirmGuestPassword, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { FormEvent, useEffect, useRef } from "react";
import { Props } from ".";

export const usePasswordForm = ({
  authorId,
  password,
  setPassword,
  onChangePassword,
  isSubComment,
  onClose,
  onSubmitSuccess
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

  return {
    onSubmitPassword,
    passwordInputRef,
    isValidGuestPassword,
    onClickCancelButton
  };
};
