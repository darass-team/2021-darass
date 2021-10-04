import { useDeleteComment, useEditComment, useLikeComment, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import SubComment, { Props } from "..";

jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/hooks/api/comment/useEditComment");
jest.mock("@/hooks/api/comment/useDeleteComment");
jest.mock("@/hooks/api/comment/useLikeComment");

describe("SubComment test", () => {
  const openConfirmModal = jest.fn();
  const openAlert = jest.fn();
  const openLikingUserModal = jest.fn();
  const setScrollHeight = jest.fn();

  (useMessageChannelFromReplyModuleContext as jest.Mock).mockImplementation(() => {
    return {
      openConfirmModal,
      openAlert,
      openLikingUserModal,
      setScrollHeight
    };
  });

  const editComment = jest.fn();
  (useEditComment as jest.Mock).mockImplementation(() => {
    return {
      editComment
    };
  });

  const deleteComment = jest.fn();
  (useDeleteComment as jest.Mock).mockImplementation(() => {
    return {
      deleteComment
    };
  });

  const likeComment = jest.fn();
  (useLikeComment as jest.Mock).mockImplementation(() => {
    return {
      likeComment
    };
  });

  beforeEach(() => {
    openConfirmModal.mockClear();
    openAlert.mockClear();
    openLikingUserModal.mockClear();
    setScrollHeight.mockClear();
    editComment.mockClear();
    deleteComment.mockClear();
    likeComment.mockClear();
  });

  describe("style test", () => {
    test("IndentTab이 렌더링된다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: false,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: false,
        hasSubComments: false,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        alreadyLiked: false,
        canIEdit: false,
        canIDelete: false
      };

      const { queryByTestId } = render(<SubComment {...props} />);

      expect(queryByTestId("subcomment-indent-icon")).toBeTruthy();
    });
  });
});
