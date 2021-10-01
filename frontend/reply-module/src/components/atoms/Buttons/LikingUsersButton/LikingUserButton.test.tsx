import { PALETTE } from "@/constants/styles/palette";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import LikingUsersButton, { Props } from ".";

describe("LikingUserButton test", () => {
  describe("style test", () => {
    test("isLiked가 true이면 Like svg의 path가 PALETTE.BLUE_700으로 fill된다.", () => {
      const props: Props = {
        numOfLikes: 0,
        isLiked: true,
        onClick: () => {}
      };

      const likingUserButton = render(<LikingUsersButton {...props} />);

      expect(likingUserButton.container.querySelector("svg")).toHaveStyle(`fill: ${PALETTE.BLUE_700}`);
    });
  });
});
