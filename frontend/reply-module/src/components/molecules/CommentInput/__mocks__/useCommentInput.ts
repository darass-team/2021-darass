import { socialLoginUser } from "@/__test__/fixture/user";
export const useCommentInput = jest.fn().mockImplementation(() => {
  return {
    onSubmit: jest.fn(),
    $contentEditable: null,
    onInput: jest.fn(),
    isFormSubmitted: false,
    isValidCommentInput: false,
    isValidGuestPassword: false,
    isValidGuestNickName: false,
    content: "",
    guestNickName: socialLoginUser.nickName,
    onChangeGuestNickName: jest.fn(),
    isSubCommentInput: false,
    guestPassword: "",
    onChangeGuestPassword: jest.fn()
  };
});
