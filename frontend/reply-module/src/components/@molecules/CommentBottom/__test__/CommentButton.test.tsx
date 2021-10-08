import { PALETTE } from "@/constants/styles/palette";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CommentBottom, { Props } from "..";

describe("CommentButton test", () => {
  describe("style test", () => {
    test("isLike가 true이면 좋아요버튼의 color가 PALETTE.BLUE_700이다.", () => {
      const props: Props = {
        alreadyLiked: true,
        isSubComment: false,
        onClickLikeButton: () => {},
        onClickAddSubCommentButton: () => {},
        commentCreatedDate: "2021-10-02"
      };

      const commentBottom = render(<CommentBottom {...props} />);

      expect(commentBottom.getByTestId("comment-bottom-like-button")).toHaveStyle(`color: ${PALETTE.BLUE_700}`);
    });
    test("isLike가 false이면 좋아요버튼의 color가 PALETTE.BLACK_700이다.", () => {
      const props: Props = {
        alreadyLiked: false,
        isSubComment: false,
        onClickLikeButton: () => {},
        onClickAddSubCommentButton: () => {},
        commentCreatedDate: "2021-10-02"
      };

      const commentBottom = render(<CommentBottom {...props} />);

      expect(commentBottom.getByTestId("comment-bottom-like-button")).toHaveStyle(`color: ${PALETTE.BLACK_700}`);
    });
  });
});
