import { useCommentInput } from "@/components/molecules/CommentInput/useCommentInput";
import { useCommentOption } from "@/components/molecules/CommentOption/useCommentOption";
import { useCommentTextBox } from "@/components/molecules/CommentTextBox/useCommentTextBox";
import { usePasswordForm } from "@/components/molecules/PasswordForm/usePasswordForm";
import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Comment, { Props } from "..";
import { useComment } from "../useComment";

jest.mock("../useComment");
jest.mock("@/components/molecules/CommentTextBox/useCommentTextBox");
jest.mock("@/components/molecules/CommentOption/useCommentOption");
jest.mock("@/components/molecules/PasswordForm/usePasswordForm");
jest.mock("@/components/molecules/CommentInput/useCommentInput");

describe("Comment test", () => {
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
      (useComment as jest.Mock).mockImplementationOnce(() => {
        return {
          user: socialLoginUser,
          projectOwnerId: 1,
          comment: comments[0],
          isVisibleCommentOption: true,
          iAmAdmin: false,
          iAmGuestUser: false,
          thisCommentIsWrittenByAdmin: false,
          thisCommentIsWrittenByGuest: false,
          thisCommentIsMine: false,
          isSubComment: false,
          alreadyLiked: false,
          hasSubComments: false,
          hasLikingUser: false,
          canIEdit: false,
          canIDelete: false,
          isSubCommentInputOpen: true,
          isOpenPassWordForm: true
        };
      });

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

      (useComment as jest.Mock).mockImplementationOnce(() => {
        return {
          user: socialLoginUser,
          projectOwnerId: 1,
          comment: comments[0],
          isVisibleCommentOption: false,
          iAmAdmin: false,
          iAmGuestUser: false,
          thisCommentIsWrittenByAdmin: false,
          thisCommentIsWrittenByGuest: false,
          thisCommentIsMine: false,
          isSubComment: false,
          alreadyLiked: false,
          hasSubComments: false,
          hasLikingUser: false,
          canIEdit: false,
          canIDelete: false,
          isSubCommentInputOpen: true
        };
      });

      const { getByTestId, queryByTestId } = render(<Comment {...props} />);

      fireEvent.click(getByTestId("comment-bottom-add-subcomment-button"));

      expect(queryByTestId("comment-input")).toBeTruthy();
    });
  });
});
