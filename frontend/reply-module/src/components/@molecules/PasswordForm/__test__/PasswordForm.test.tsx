import { useConfirmGuestPassword, useInput, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { comments } from "@/__test__/fixture/comments";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import PasswordForm, { Props } from "..";

jest.mock("@/hooks/api/comment/useConfirmGuestPassword");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");

describe("PasswordForm test", () => {
  const refetchConfirmGuestPassword = jest.fn();
  const resetConfirmGuestPassword = jest.fn();
  let isValidPassword = false;

  (useConfirmGuestPassword as jest.Mock).mockImplementation(() => {
    return {
      data: isValidPassword,
      isLoading: false,
      error: false,
      refetch: refetchConfirmGuestPassword,
      reset: resetConfirmGuestPassword
    };
  });

  const setScrollHeight = jest.fn();
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockImplementation(() => {
    return { setScrollHeight };
  });

  beforeEach(() => {
    isValidPassword = false;
    refetchConfirmGuestPassword.mockClear();
    resetConfirmGuestPassword.mockClear();
    setScrollHeight.mockClear();
  });

  describe("logic test", () => {
    test("비밀번호를 입력버튼을 누르면 refetchConfirmGuestPassword가 호출된다.", () => {
      const onClose = jest.fn();
      const onSubmitSuccess = jest.fn();

      const PasswordFormWrapper = () => {
        const { value: password, setValue: setPassword, onChange: onChangePassword } = useInput("");

        const props: Props = {
          authorId: comments[0].id,
          password,
          setPassword,
          onChangePassword,
          isSubComment: false,
          onClose,
          onSubmitSuccess
        };

        return <PasswordForm {...props} />;
      };

      const { getByTestId } = render(<PasswordFormWrapper />);

      fireEvent.click(getByTestId("comment-guest-password-submit-button"));

      expect(refetchConfirmGuestPassword).toHaveBeenCalledTimes(1);
    });

    test("비밀번호를 입력취소버튼을 누르면 onClose,resetConfirmGuestPassword 가 호출된다.", () => {
      isValidPassword = true;
      const onClose = jest.fn();
      const onSubmitSuccess = jest.fn();

      const PasswordFormWrapper = () => {
        const { value: password, setValue: setPassword, onChange: onChangePassword } = useInput("");

        const props: Props = {
          authorId: comments[0].id,
          password,
          setPassword,
          onChangePassword,
          isSubComment: true,
          onClose,
          onSubmitSuccess
        };

        return <PasswordForm {...props} />;
      };

      const { getByTestId } = render(<PasswordFormWrapper />);

      fireEvent.click(getByTestId("comment-guest-password-cancel-button"));

      expect(onClose).toHaveBeenCalledTimes(2);
      expect(resetConfirmGuestPassword).toHaveBeenCalledTimes(2);
    });
  });
});
