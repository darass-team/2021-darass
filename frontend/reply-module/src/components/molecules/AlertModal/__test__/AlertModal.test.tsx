import { render } from "@testing-library/react";
import AlertModal from "..";
import { useFullScreenModal } from "../../FullScreenModal/useFullScreenModal";
import { useModal } from "../../Modal/useModal";
import { useAlertModal } from "../useAlertModal";

jest.mock("../../FullScreenModal/useFullScreenModal");
jest.mock("../../Modal/useModal");
jest.mock("../useAlertModal");

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

describe("AlertModal test", () => {
  test("rendering test", () => {
    (useAlertModal as jest.Mock).mockImplementation(() => {
      return {
        isOpen: false,
        data: "message",
        setData: jest.fn(),
        openModal: jest.fn(),
        onCloseModal: jest.fn()
      };
    });

    const { getByTestId } = render(<AlertModal />);

    expect(getByTestId("alert-modal-container")).toBeTruthy();
  });
});
