import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { render, fireEvent } from "@testing-library/react";
import AlertModal from "..";

jest.mock("@/hooks/contexts/useMessageFromReplyModal");

describe("AlertModal test", () => {
  test("rendering test", () => {
    const { getByTestId } = render(<AlertModal />);

    expect(getByTestId("alert-modal-container")).toBeTruthy();
  });
  test("OkButton을 누르면, closeAlertModal이 호출된다.", () => {
    const closeAlertModal = jest.fn();
    (useMessageChannelFromReplyModalContext as jest.Mock).mockImplementationOnce(() => {
      return {
        closeAlertModal
      };
    });

    const { getByTestId } = render(<AlertModal />);

    fireEvent.click(getByTestId("alert-modal-ok-button"));

    expect(closeAlertModal).toHaveBeenCalled();
  });
});
