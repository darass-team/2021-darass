import { PALETTE } from "@/constants/styles/palette";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import LikingUsersButton from "..";

describe("LikingUserButton test", () => {
  describe("style test", () => {
    test("기본 스타일 테스트", () => {
      const likingUserButton = render(<LikingUsersButton numOfLikes={1} alreadyLiked={false} onClick={() => {}} />);
      const button = likingUserButton.getByRole("button");

      expect(button).toBeVisible();
      expect(button).toHaveStyle(`background-color: ${PALETTE.WHITE}`);
    });
    test("기본 스타일 테스트2", () => {
      const likingUserButton = render(<LikingUsersButton numOfLikes={1} alreadyLiked={true} onClick={() => {}} />);
      const button = likingUserButton.getByRole("button");

      expect(button).toBeVisible();
      expect(button).toHaveStyle(`background-color: ${PALETTE.WHITE}`);
    });
  });
});
