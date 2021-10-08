import { render } from "@testing-library/react";
import { useReplyModuleApp } from "../useReplyModuleApp";
import App from "../ReplyModuleApp";
import CommentArea from "../pages/CommentArea";

jest.mock("../pages/CommentArea", () => {
  return <div data-testid="comment-list">commentList</div>;
});
jest.mock("../useReplyModuleApp");

beforeEach(() => {
  (useReplyModuleApp as jest.Mock).mockClear();
});

describe("ReplyModuleApp test", () => {
  test("port가 없으면 LoadingPage가 렌더링된다.", () => {
    (useReplyModuleApp as jest.Mock).mockImplementationOnce(() => {
      return {
        ...jest.requireActual("../useReplyModuleApp"),
        port: undefined
      };
    });

    const { queryByAltText } = render(<App />);

    expect(queryByAltText("로딩중")).toBeTruthy();
  });
});
