import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CommentList, { Props } from "..";
import { useComment } from "@/components/@organisms/Comment/useComment";

jest.mock("@/components/organisms/Comment/useComment");

describe("CommentList test", () => {
  test("notice가 있다면, notice가 렌더링 된다.", () => {
    const props: Props = {
      user: socialLoginUser,
      projectOwnerId: comments[1].user.id,
      totalCommentsCount: 1,
      comments: [comments[2]],
      notice: "작성된 댓글이 없습니다",
      sortOption: "latest",
      onSelectSortOption: jest.fn()
    };

    const { queryByText } = render(<CommentList {...props} />);

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
      onSelectSortOption
    };

    const { getByText } = render(<CommentList {...props} />);
    fireEvent.click(getByText("최신순"));

    expect(onSelectSortOption).toHaveBeenLastCalledWith("latest");
  });
});
