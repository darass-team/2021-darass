import { render } from "@testing-library/react";
import LikingUsersModal from "..";

describe("LikingUsersModal test", () => {
  test("rendering test", () => {
    const { getByTestId } = render(<LikingUsersModal />);

    expect(getByTestId("liking-users-modal-container")).toBeTruthy();
  });
});
