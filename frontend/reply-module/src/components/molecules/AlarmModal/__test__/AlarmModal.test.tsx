import { alarmContents } from "@/__test__/fixture/alarmContent";
import { render } from "@testing-library/react";
import AlarmModal from "..";
import { useFullScreenModal } from "../../FullScreenModal/useFullScreenModal";
import { useModal } from "../../Modal/useModal";
import { useAlarmModal } from "../useAlarmModal";

jest.mock("../../FullScreenModal/useFullScreenModal");
jest.mock("../../Modal/useModal");
jest.mock("../useAlarmModal");

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

describe("AlarmModal test", () => {
  test("rendering test", () => {
    (useAlarmModal as jest.Mock).mockImplementation(() => {
      return {
        isOpen: false,
        data: alarmContents,
        setData: jest.fn(),
        openModal: jest.fn(),
        onCloseModal: jest.fn()
      };
    });

    const { getByTestId } = render(<AlarmModal />);

    expect(getByTestId("alarm-modal-container")).toBeTruthy();
  });
});
