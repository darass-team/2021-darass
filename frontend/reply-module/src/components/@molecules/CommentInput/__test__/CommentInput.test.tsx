import { PALETTE } from "@/constants/styles/palette";
import { useCreateComment, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { getErrorMessage } from "@/utils/errorMessage";
import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CommentInput, { Props } from "..";

jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/hooks/api/comment/useCreateComment");
jest.mock("@/utils/focusContentEditableTextToEnd");

describe("CommentInput test", () => {
  const openAlert = jest.fn();
  const setScrollHeight = jest.fn();
  const createComment = jest.fn();

  (useMessageChannelFromReplyModuleContext as jest.Mock).mockImplementation(() => {
    return {
      openAlert,
      setScrollHeight
    };
  });

  (useCreateComment as jest.Mock).mockImplementation(() => {
    return {
      createComment
    };
  });

  describe("logic test", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("User가 없으면, 유저 이름, 유저 비밀번호 창이 나타난다.", () => {
      const props: Props = {
        user: undefined,
        parentCommentId: comments[0].id,
        isSubComment: false
      };

      const { queryByTestId } = render(<CommentInput {...props} />);

      expect(queryByTestId("comment-input-guest-name")).toBeTruthy();
      expect(queryByTestId("comment-input-guest-password")).toBeTruthy();
    });

    test("대댓글 입력 input이면, 취소버튼이 보인다.", () => {
      const props: Props = {
        user: undefined,
        parentCommentId: comments[0].id,
        isSubComment: true,
        onClose: () => {}
      };

      const { queryByTestId } = render(<CommentInput {...props} />);

      expect(queryByTestId("comment-input-cancel-button")).toBeTruthy();
    });
    test("기본 댓글 입력 input이면, 취소버튼이 보이지 않는다.", () => {
      const props: Props = {
        user: undefined,
        parentCommentId: comments[0].id,
        isSubComment: false
      };

      const { queryByTestId } = render(<CommentInput {...props} />);

      expect(queryByTestId("comment-input-cancel-button")).toBeFalsy();
    });

    test("비로그인 시, 이름/비밀번호/댓글내용을 입력하지 않고 등록버튼을 누르면, getErrorMessage.commentInput customAlert을 요청한다.", async () => {
      const props: Props = {
        user: undefined,
        parentCommentId: comments[0].id,
        isSubComment: false,
        onClose: () => {}
      };

      const { getByTestId } = render(<CommentInput {...props} />);

      const 제출버튼 = getByTestId("comment-input-submit-button");

      fireEvent.click(제출버튼);

      await waitFor(() => {
        expect(openAlert).toHaveBeenCalledWith(getErrorMessage.commentInput(""));
      });
    });
    test("비로그인 시, 댓글내용,비밀번호는 입력하고 이름을 입력하지 않고 등록버튼을 누르면, getErrorMessage.guestNickName customAlert을 요청한다.", async () => {
      const props: Props = {
        user: undefined,
        parentCommentId: comments[0].id,
        isSubComment: false,
        onClose: () => {}
      };

      const { getByTestId } = render(<CommentInput {...props} />);

      fireEvent.input(getByTestId("comment-input-text-box"), { target: { innerHTML: "댓글내용" } });
      fireEvent.change(getByTestId("comment-input-guest-password"), { target: { value: "비밀번호" } });

      const 제출버튼 = getByTestId("comment-input-submit-button");

      fireEvent.click(제출버튼);

      await waitFor(() => {
        expect(openAlert).toHaveBeenCalledWith(getErrorMessage.guestNickName(""));
      });
    });
    test("비로그인 시, 댓글내용와 이름은 입력하고 비밀번호을 입력하지 않고 등록버튼을 누르면, guestPassword customAlert을 요청한다.", async () => {
      const props: Props = {
        user: undefined,
        parentCommentId: comments[0].id,
        isSubComment: false,
        onClose: () => {}
      };

      const { getByTestId } = render(<CommentInput {...props} />);

      fireEvent.input(getByTestId("comment-input-text-box"), { target: { innerHTML: "댓글내용" } });
      fireEvent.change(getByTestId("comment-input-guest-name"), { target: { value: "이름" } });

      const 제출버튼 = getByTestId("comment-input-submit-button");

      fireEvent.click(제출버튼);

      await waitFor(() => {
        expect(openAlert).toHaveBeenCalledWith(getErrorMessage.guestPassword(""));
      });
    });

    test("로그인 시, 댓글 내용을 입력하고 등록버튼을 누르면 createComment가 1번 호출된다.", async () => {
      const props: Props = {
        user: socialLoginUser,
        parentCommentId: comments[0].id,
        isSubComment: false,
        onClose: () => {}
      };

      const { getByTestId } = render(<CommentInput {...props} />);

      fireEvent.input(getByTestId("comment-input-text-box"), { target: { innerHTML: "댓글내용" } });

      const 제출버튼 = getByTestId("comment-input-submit-button");
      fireEvent.click(제출버튼);

      await waitFor(() => {
        expect(createComment).toHaveBeenCalled();
      });
    });
  });

  describe("style test", () => {
    test("비로그인 시, 이름/비밀번호/댓글내용을 입력하지 않고 등록버튼을 누르면, 각 입력창의 테두리가 붉게 변한다.", async () => {
      const props: Props = {
        user: undefined,
        parentCommentId: comments[0].id,
        isSubComment: false,
        onClose: () => {}
      };

      const { getByTestId } = render(<CommentInput {...props} />);

      const 제출버튼 = getByTestId("comment-input-submit-button");

      fireEvent.click(제출버튼);

      await waitFor(() => {
        expect(getByTestId("comment-input-text-box")).toHaveStyle(`border-color: ${PALETTE.RED_600}`);
        expect(getByTestId("comment-input-guest-name")).toHaveStyle(`border-color: ${PALETTE.RED_600}`);
        expect(getByTestId("comment-input-guest-password")).toHaveStyle(`border-color: ${PALETTE.RED_600}`);
      });
    });

    test("로그인 시, 댓글내용을 입력하지 않고 등록버튼을 누르면, 각 입력창의 테두리가 붉게 변한다.", async () => {
      const props: Props = {
        user: socialLoginUser,
        parentCommentId: undefined,
        isSubComment: true,
        onClose: () => {}
      };

      const { getByTestId } = render(<CommentInput {...props} />);

      const 제출버튼 = getByTestId("comment-input-submit-button");

      fireEvent.click(제출버튼);

      await waitFor(() => {
        expect(getByTestId("comment-input-text-box")).toHaveStyle(`border-color: ${PALETTE.RED_600}`);
      });
    });
  });
});
