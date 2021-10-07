import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { render } from "@testing-library/react";
import ConfirmModal from "..";

jest.mock("@/hooks/contexts/useMessageFromReplyModal");

describe("ConfirmModal test", () => {
  test("rendering test", () => {
    const { getByTestId } = render(<ConfirmModal />);

    expect(getByTestId("confirm-modal-container")).toBeTruthy();
  });
});
