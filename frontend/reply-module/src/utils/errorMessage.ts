import {
  GUEST_NICKNAME_MAX_LENGTH,
  GUEST_NICKNAME_MIN_LENGTH,
  GUEST_PASSWORD_MAX_LENGTH,
  GUEST_PASSWORD_MIN_LENGTH,
  MAX_COMMENT_INPUT_LENGTH
} from "../constants/comment";
import { isEmptyString } from "./isEmptyString";

export const getErrorMessage = {
  commentInput: (commentInput: string) => {
    if (isEmptyString(commentInput)) return `댓글을 입력해주세요.`;
    if (commentInput.length > MAX_COMMENT_INPUT_LENGTH)
      return `댓글은 최대 ${MAX_COMMENT_INPUT_LENGTH}자까지 입력할 수 있습니다.`;

    return "";
  },
  guestNickName: (guestNickName: string) => {
    if (guestNickName.length === 0) return `이름을 입력해주세요.`;
    if (guestNickName.length > GUEST_NICKNAME_MAX_LENGTH)
      return `이름은 최대 ${GUEST_NICKNAME_MAX_LENGTH}자까지 입력할 수 있습니다.`;

    return "";
  },
  guestPassword: (guestPassword: string) => {
    if (guestPassword.length === 0) return `비밀번호를 입력해주세요.`;
    if (guestPassword.length > GUEST_PASSWORD_MAX_LENGTH)
      return `비밀번호는 최대 ${GUEST_PASSWORD_MAX_LENGTH}자까지 입력할 수 있습니다.`;

    return "";
  }
};
