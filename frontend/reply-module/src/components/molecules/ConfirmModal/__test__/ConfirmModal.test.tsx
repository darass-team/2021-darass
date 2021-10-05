import { render } from "@testing-library/react";
import ConfirmModal from "..";
import { useFullScreenModal } from "../../FullScreenModal/useFullScreenModal";
import { useModal } from "../../Modal/useModal";
import { useConfirmModal } from "../useConfirmModal";

jest.mock("../../FullScreenModal/useFullScreenModal");
jest.mock("../../Modal/useModal");
jest.mock("../useConfirmModal");

(useFullScreenModal as jest.Mock).mockImplementation(() => {
  return {
    onCloseModal: jest.fn()
  };
});

(useModal as jest.Mock).mockImplementation(() => {
  return {
    onCloseModal: jest.fn()
  };
});

describe("ConfirmModal test", () => {
  test("rendering test", () => {
    (useConfirmModal as jest.Mock).mockImplementation(() => {
      return {
        isOpen: false,
        data: "message",
        setData: jest.fn(),
        openModal: jest.fn(),
        onCloseModal: jest.fn()
      };
    });

    const { getByTestId } = render(<ConfirmModal />);

    expect(getByTestId("confirm-modal-container")).toBeTruthy();
  });
});
