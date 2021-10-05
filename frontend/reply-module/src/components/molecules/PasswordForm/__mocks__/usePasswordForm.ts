export const usePasswordForm = jest.fn().mockImplementation(() => {
  return {
    onSubmitPassword: jest.fn(),
    passwordInputRef: null,
    isValidGuestPassword: false,
    onClickCancelButton: jest.fn()
  };
});
