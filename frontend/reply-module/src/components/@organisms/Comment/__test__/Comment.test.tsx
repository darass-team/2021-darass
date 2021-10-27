import { PALETTE } from "@/constants/styles/palette";
import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Comment, { Props } from "..";

jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/hooks/api/comment/useEditComment");
jest.mock("@/hooks/api/comment/useDeleteComment");
jest.mock("@/hooks/api/comment/useLikeComment");
jest.mock("@/hooks/api/comment/useCreateComment");

describe("Comment test", () => {
  describe("logic test", () => {
    test("비밀댓글이면, profileImageUrl이 guestProfileImageUrl이다.", () => {});

    test("isVisibleCommentOption이 false이면 CommentOption이 보이지 않는다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: false,
        isAllowToControl: false,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: false,
        hasSubComments: false,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        isReadable: true,
        alreadyLiked: false,
        canIEdit: false,
        canIDelete: false
      };

      const { queryByTestId } = render(
        <ThemeProvider
          theme={{
            isDarkModePage: false,
            primaryColor: PALETTE.PRIMARY,
            uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true }
          }}
        >
          <Comment {...props} />
        </ThemeProvider>
      );

      expect(queryByTestId("comment-option")).toBeFalsy();
    });

    test("isVisibleCommentOption이 true이면 CommentOption가 보인다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: true,
        isAllowToControl: true,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: false,
        hasSubComments: false,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        isReadable: true,
        alreadyLiked: false,
        canIEdit: false,
        canIDelete: false
      };

      const { queryByTestId } = render(
        <ThemeProvider
          theme={{
            isDarkModePage: false,
            primaryColor: PALETTE.PRIMARY,
            uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true }
          }}
        >
          <Comment {...props} />
        </ThemeProvider>
      );

      expect(queryByTestId("comment-option")).toBeTruthy();
    });

    test("hasLikingUser true이면 LikingUsersButton가 보인다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: false,
        isAllowToControl: false,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: true,
        hasSubComments: false,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        isReadable: true,
        alreadyLiked: false,
        canIEdit: false,
        canIDelete: false
      };

      const { queryByTestId } = render(
        <ThemeProvider
          theme={{
            isDarkModePage: false,
            primaryColor: PALETTE.PRIMARY,
            uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true }
          }}
        >
          <Comment {...props} />
        </ThemeProvider>
      );

      expect(queryByTestId("comment-liking-user-button")).toBeTruthy();
    });

    test("hasLikingUser false이면 LikingUsersButton 보이지 않는다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: false,
        isAllowToControl: false,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: false,
        hasSubComments: false,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        isReadable: true,
        alreadyLiked: false,
        canIEdit: false,
        canIDelete: false
      };

      const { queryByTestId } = render(
        <ThemeProvider
          theme={{
            isDarkModePage: false,
            primaryColor: PALETTE.PRIMARY,
            uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true }
          }}
        >
          <Comment {...props} />
        </ThemeProvider>
      );

      expect(queryByTestId("comment-liking-user-button")).toBeFalsy();
    });

    test("CommentOption을 클릭해 edit버튼을 클릭하면 isOpenPassWordForm true가 되어, PasswordForm이 보인다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: true,
        isAllowToControl: true,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: false,
        hasSubComments: false,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        isReadable: true,
        alreadyLiked: false,
        canIEdit: true,
        canIDelete: false
      };

      const { getByTestId, queryByTestId } = render(
        <ThemeProvider
          theme={{
            isDarkModePage: false,
            primaryColor: PALETTE.PRIMARY,
            uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true }
          }}
        >
          <Comment {...props} />
        </ThemeProvider>
      );

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
        isAllowToControl: true,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: false,
        hasSubComments: true,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        isReadable: true,
        alreadyLiked: false,
        canIEdit: true,
        canIDelete: false
      };

      const { queryByTestId } = render(
        <ThemeProvider
          theme={{
            isDarkModePage: false,
            primaryColor: PALETTE.PRIMARY,
            uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true }
          }}
        >
          <Comment {...props} />
        </ThemeProvider>
      );

      expect(queryByTestId("comment-subcomment-wrapper")).toBeTruthy();
    });

    test("CommentBottom의 답글달기 버튼을 클릭하면, 답글달기 CommentInput이 보인다.", () => {
      const props: Props = {
        user: undefined,
        projectOwnerId: socialLoginUser.id,
        comment: comments[0],
        isVisibleCommentOption: true,
        isAllowToControl: true,
        iAmAdmin: false,
        iAmGuestUser: false,
        hasLikingUser: false,
        hasSubComments: true,
        thisCommentIsWrittenByAdmin: false,
        thisCommentIsWrittenByGuest: false,
        thisCommentIsMine: false,
        isSubComment: false,
        isReadable: true,
        alreadyLiked: false,
        canIEdit: true,
        canIDelete: false
      };

      const { getByTestId, queryByTestId } = render(
        <ThemeProvider
          theme={{
            isDarkModePage: false,
            primaryColor: PALETTE.PRIMARY,
            uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true }
          }}
        >
          <Comment {...props} />
        </ThemeProvider>
      );

      fireEvent.click(getByTestId("comment-bottom-add-subcomment-button"));

      expect(queryByTestId("comment-input")).toBeTruthy();
    });
  });
});
