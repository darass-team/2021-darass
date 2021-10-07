import { render } from "@testing-library/react";
import AlarmModal from "..";

jest.mock("@/hooks/contexts/useMessageFromReplyModal");

describe("AlarmModal test", () => {
  test("rendering test", () => {
    const { getByTestId } = render(<AlarmModal />);

    expect(getByTestId("alarm-modal-container")).toBeTruthy();
  });
});
