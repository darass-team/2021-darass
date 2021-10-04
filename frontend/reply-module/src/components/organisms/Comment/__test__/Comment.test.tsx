import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useDeleteComment, useEditComment, useLikeComment, useMessageChannelFromReplyModuleContext } from "@/hooks";
import Comment, { Props } from "..";
import { socialLoginUser } from "@/__test__/fixture/user";
import { comments } from "@/__test__/fixture/comments";
import { usePasswordForm } from "@/components/molecules/PasswordForm/usePasswordForm";
import { useCommentInput } from "@/components/molecules/CommentInput/useCommentInput";

jest.mock("@/components/molecules/PasswordForm/usePasswordForm");
jest.mock("@/components/molecules/CommentInput/useCommentInput");

jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/hooks/api/comment/useEditComment");
jest.mock("@/hooks/api/comment/useDeleteComment");
jest.mock("@/hooks/api/comment/useLikeComment");

describe("Comment test", () => {
  (usePasswordForm as jest.Mock).mockImplementation(() => {
    return {
      onSubmitPassword: jest.fn(),
      passwordInputRef: null,
      isValidGuestPassword: true,
      onClickCancelButton: jest.fn()
    };
  });
  (useCommentInput as jest.Mock).mockImplementation(() => {
    return {
      onSubmit: jest.fn(),
      $contentEditable: null,
      onInput: jest.fn(),
      isFormSubmitted: true,
      isValidCommentInput: true,
      isValidGuestPassword: true,
      isValidGuestNickName: true,
      content: "",
      guestNickName: "",
      onChangeGuestNickName: jest.fn(),
      isSubCommentInput: true,
      guestPassword: "",
      onChangeGuestPassword: jest.fn()
    };
  });

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

  describe("logic test", () => {
    test("isVisibleCommentOption이 false이면 CommentOption이 보이지 않는다.", () => {
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

      const { queryByTestId } = render(<Comment {...props} />);

      expect(queryByTestId("comment-option")).toBeFalsy();
    });
    test("isVisibleCommentOption이 true이면 CommentOption가 보인다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: true,
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

      const { queryByTestId } = render(<Comment {...props} />);

      expect(queryByTestId("comment-option")).toBeTruthy();
    });

    test("hasLikingUser true이면 LikingUsersButton가 보인다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: false,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: true,
        hasSubComments: false,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        alreadyLiked: false,
        canIEdit: false,
        canIDelete: false
      };

      const { queryByTestId } = render(<Comment {...props} />);

      expect(queryByTestId("comment-liking-user-button")).toBeTruthy();
    });
    test("hasLikingUser false이면 LikingUsersButton 보이지 않는다.", () => {
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

      const { queryByTestId } = render(<Comment {...props} />);

      expect(queryByTestId("comment-liking-user-button")).toBeFalsy();
    });

    test("CommentOption을 클릭해 edit버튼을 클릭하면 isOpenPassWordForm true가 되어, PasswordForm이 보인다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: true,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: false,
        hasSubComments: false,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        alreadyLiked: false,
        canIEdit: true,
        canIDelete: false
      };

      const { getByTestId, queryByTestId } = render(<Comment {...props} />);

      fireEvent.click(getByTestId("comment-option"));
      fireEvent.click(getByTestId("comment-option-edit-button"));

      expect(queryByTestId("comment-password-form")).toBeTruthy();
    });

    test("hasSubComments=true이면 SubComment가 보인다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: true,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: false,
        hasSubComments: true,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        alreadyLiked: false,
        canIEdit: true,
        canIDelete: false
      };

      const { queryByTestId } = render(<Comment {...props} />);

      expect(queryByTestId("comment-subcomment-wrapper")).toBeTruthy();
    });

    test("답글달기 버튼을 클릭하면, 답글달기 CommentInput이 보인다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: true,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: false,
        hasSubComments: true,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        alreadyLiked: false,
        canIEdit: true,
        canIDelete: false
      };

      const { getByTestId, queryByTestId } = render(<Comment {...props} />);

      fireEvent.click(getByTestId("comment-bottom-add-subcomment-button"));

      expect(queryByTestId("comment-input")).toBeTruthy();
    });
  });
});
