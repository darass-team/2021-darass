import { render } from "@testing-library/react";
import ConfirmModal from "..";

jest.mock("../../FullScreenModal/useFullScreenModal");
jest.mock("../../Modal/useModal");
jest.mock("../useConfirmModal");

describe("ConfirmModal test", () => {
  test("rendering test", () => {
    const { getByTestId } = render(<ConfirmModal />);

    expect(getByTestId("confirm-modal-container")).toBeTruthy();
  });
});
