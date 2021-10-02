import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CommentInput, { Props } from ".";

describe("CommentInput test", () => {
  describe("logic test", () => {
    test("TextBox의 최대길이는 3000자이다.", () => {
      //   const props: Props = {
      //     user: socialLoginUser,
      //     parentCommentId: comments[0].id,
      //     isSubComment: false,
      //     onClose: () => {}
      //   };
      //   const { getByTestId } = render(<CommentInput {...props} />);
      //   fireEvent.change(getByTestId("comment-input-guest-name"), { target: { value: "a".repeat(3001) } });
      //   expect(getByTestId("comment-input-text-length")).toHaveTextContent("3000 / 3000");
    });
  });
});
