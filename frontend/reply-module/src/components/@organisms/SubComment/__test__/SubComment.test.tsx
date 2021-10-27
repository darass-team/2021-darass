import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import SubComment, { Props } from "..";

jest.mock("@/hooks/api/comment/useEditComment");
jest.mock("@/hooks/api/comment/useDeleteComment");
jest.mock("@/hooks/api/comment/useLikeComment");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");

describe("SubComment test", () => {
  describe("style test", () => {
    test("IndentTab이 렌더링된다.", () => {
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
        isReadable: true,
        isSubComment: false,
        alreadyLiked: false,
        canIEdit: false,
        canIDelete: false
      };

      const { queryByTestId } = render(
        <ThemeProvider theme={{ uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true } }}>
          <SubComment {...props} />
        </ThemeProvider>
      );

      expect(queryByTestId("subcomment-indent-icon")).toBeTruthy();
    });
  });
});
