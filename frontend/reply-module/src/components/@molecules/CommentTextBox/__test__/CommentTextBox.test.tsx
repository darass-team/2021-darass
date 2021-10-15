import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import { focusContentEditableTextToEnd } from "@/utils/focusContentEditableTextToEnd";
import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CommentTextBox, { Props } from "..";

jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/utils/focusContentEditableTextToEnd");

describe("CommentTextBox test", () => {
  const focusContentEditableTextToEnd = jest.fn();
  const setScrollHeight = jest.fn();
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockImplementation(() => {
    return {
      setScrollHeight
    };
  });

  beforeEach(() => {
    setScrollHeight.mockClear();
    focusContentEditableTextToEnd.mockClear();
  });

  describe("logic test", () => {
    test("contentEditable=true이면, 취소,등록 버튼이 보인다", () => {
      const resetState = jest.fn();
      const onSubmitEditedComment = jest.fn();

      const props: Props = {
        name: socialLoginUser.nickName,
        children: comments[0].content,
        contentEditable: true,
        thisCommentIsWrittenByAdmin: false,
        isSubComment: false,
        thisCommentIsWrittenByGuest: false,
        isReadable: true,
        isSecretComment: false,
        resetState,
        onSubmitEditedComment
      };

      const { queryByTestId } = render(<CommentTextBox {...props} />);

      expect(queryByTestId("comment-text-box-cancel-button")).toBeTruthy();
      expect(queryByTestId("comment-text-box-submit-button")).toBeTruthy();
    });

    test("contentEditable=false이면, 취소,등록 버튼이 보이지 않는다", () => {
      const resetState = jest.fn();
      const onSubmitEditedComment = jest.fn();

      const props: Props = {
        name: socialLoginUser.nickName,
        children: comments[0].content,
        thisCommentIsWrittenByAdmin: true,
        isSubComment: true,
        thisCommentIsWrittenByGuest: false,
        isReadable: true,
        isSecretComment: false,
        resetState,
        onSubmitEditedComment
      };

      const { queryByTestId } = render(<CommentTextBox {...props} />);

      expect(queryByTestId("comment-text-box-cancel-button")).toBeFalsy();
      expect(queryByTestId("comment-text-box-submit-button")).toBeFalsy();
    });

    test("취소 버튼을 누르면, resetState가 호출된다.", () => {
      const resetState = jest.fn();
      const onSubmitEditedComment = jest.fn();

      const props: Props = {
        name: socialLoginUser.nickName,
        children: comments[0].content,
        contentEditable: true,
        thisCommentIsWrittenByAdmin: false,
        isSubComment: false,
        isReadable: true,
        thisCommentIsWrittenByGuest: false,
        isSecretComment: false,
        resetState,
        onSubmitEditedComment
      };

      const { getByTestId } = render(<CommentTextBox {...props} />);

      fireEvent.click(getByTestId("comment-text-box-cancel-button"));

      expect(resetState).toHaveBeenCalledTimes(1);
    });
    test("확인 버튼을 누르면, onSubmitEditedComment가 호출된다.", () => {
      const resetState = jest.fn();
      const onSubmitEditedComment = jest.fn();

      const props: Props = {
        name: socialLoginUser.nickName,
        children: comments[0].content,
        contentEditable: true,
        thisCommentIsWrittenByAdmin: false,
        isSubComment: false,
        thisCommentIsWrittenByGuest: false,
        isReadable: true,
        isSecretComment: false,
        resetState,
        onSubmitEditedComment
      };

      const { getByTestId } = render(<CommentTextBox {...props} />);

      fireEvent.click(getByTestId("comment-text-box-submit-button"));

      expect(onSubmitEditedComment).toHaveBeenCalledTimes(1);
    });
  });
});
