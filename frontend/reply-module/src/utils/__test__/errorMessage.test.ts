import {
  GUEST_NICKNAME_MAX_LENGTH,
  GUEST_NICKNAME_MIN_LENGTH,
  GUEST_PASSWORD_MAX_LENGTH,
  MAX_COMMENT_INPUT_LENGTH
} from "@/constants/comment";
import { getErrorMessage } from "../errorMessage";

describe("getErrorMessage test", () => {
  describe("commentInput error test", () => {
    test("when empty string test", () => {
      const res = getErrorMessage.commentInput("");

      expect(res).toEqual("댓글을 입력해주세요.");
    });

    test("commentInput.length > MAX_COMMENT_INPUT_LENGTH", () => {
      const res = getErrorMessage.commentInput("a".repeat(MAX_COMMENT_INPUT_LENGTH + 1));

      expect(res).toEqual(`댓글은 최대 ${MAX_COMMENT_INPUT_LENGTH}자까지 입력할 수 있습니다.`);
    });

    test("normal", () => {
      const res = getErrorMessage.commentInput("a".repeat(MAX_COMMENT_INPUT_LENGTH - 1));

      expect(res).toEqual(``);
    });
  });

  describe("guestNickName error test", () => {
    test("no name", () => {
      const res = getErrorMessage.guestNickName("");

      expect(res).toEqual(`이름을 입력해주세요.`);
    });
    test("max length", () => {
      const res = getErrorMessage.guestNickName("a".repeat(GUEST_NICKNAME_MAX_LENGTH + 1));

      expect(res).toEqual(`이름은 최대 ${GUEST_NICKNAME_MAX_LENGTH}자까지 입력할 수 있습니다.`);
    });
    test("normal", () => {
      const res = getErrorMessage.guestNickName("a".repeat(GUEST_NICKNAME_MAX_LENGTH - 1));

      expect(res).toEqual(``);
    });
  });

  describe("guestPassword error test", () => {
    test("no password", () => {
      const res = getErrorMessage.guestPassword("");

      expect(res).toEqual(`비밀번호를 입력해주세요.`);
    });
    test("max password", () => {
      const res = getErrorMessage.guestPassword("a".repeat(GUEST_PASSWORD_MAX_LENGTH + 1));

      expect(res).toEqual(`비밀번호는 최대 ${GUEST_PASSWORD_MAX_LENGTH}자까지 입력할 수 있습니다.`);
    });

    test("normal", () => {
      const res = getErrorMessage.guestPassword("a".repeat(GUEST_PASSWORD_MAX_LENGTH - 1));

      expect(res).toEqual("");
    });
  });
});
