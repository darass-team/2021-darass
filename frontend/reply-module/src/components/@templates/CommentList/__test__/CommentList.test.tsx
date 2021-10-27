import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import { fireEvent, render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import CommentList, { Props } from "..";

jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/hooks/api/comment/useEditComment");
jest.mock("@/hooks/api/comment/useDeleteComment");
jest.mock("@/hooks/api/comment/useLikeComment");

describe("CommentList test", () => {
  test("notice가 있다면, notice가 렌더링 된다.", () => {
    const props: Props = {
      user: socialLoginUser,
      projectOwnerId: comments[1].user.id,
      totalCommentsCount: 1,
      comments: [comments[2]],
      notice: "작성된 댓글이 없습니다",
      isVisible: true,
      sortOption: "latest",
      onSelectSortOption: jest.fn()
    };

    const { queryByText } = render(
      <ThemeProvider theme={{ uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true } }}>
        <CommentList {...props} />
      </ThemeProvider>
    );

    expect(queryByText("작성된 댓글이 없습니다")).toBeTruthy();
  });

  test("최신순 OrderButton을 클릭하면, onSelectSortOption이 latest인자가 들어가서 호출된다.", () => {
    const onSelectSortOption = jest.fn();

    const props: Props = {
      user: undefined,
      projectOwnerId: comments[1].user.id,
      totalCommentsCount: 1,
      comments: [comments[1]],
      notice: "작성된 댓글이 없습니다",
      sortOption: "latest",
      isVisible: true,
      onSelectSortOption
    };

    const { getByText } = render(
      <ThemeProvider theme={{ uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true } }}>
        <CommentList {...props} />
      </ThemeProvider>
    );
    fireEvent.click(getByText("최신순"));

    expect(onSelectSortOption).toHaveBeenLastCalledWith("latest");
  });
});
