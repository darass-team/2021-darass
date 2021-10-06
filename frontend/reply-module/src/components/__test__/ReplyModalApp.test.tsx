import { render } from "@testing-library/react";
import App from "../ReplyModalApp";
import { useReplyModalApp } from "../useReplyModalApp";

jest.mock("../useReplyModalApp");

beforeEach(() => {
  (useReplyModalApp as jest.Mock).mockClear();
});

describe("ReplyModalApp test", () => {
  test("port가 없으면, LoadingPage가 렌더링 된다.", () => {
    (useReplyModalApp as jest.Mock).mockImplementationOnce(() => {
      return {
        port: undefined,
        receivedMessageFromReplyModule: ""
      };
    });

    const { queryByAltText } = render(<App />);

    expect(queryByAltText("로딩중")).toBeTruthy();
  });
  test("port가 있으면, LoadingPage가 렌더링 되지 않고, 'LikingUsersModal, ConfirmModal, AlarmModal, AlertModal'이 렌더링된다.", () => {
    const { queryByAltText, queryByTestId } = render(<App />);

    expect(queryByAltText("로딩중")).toBeFalsy();

    expect(queryByTestId("liking-users-modal-container")).toBeTruthy();
  });
});
