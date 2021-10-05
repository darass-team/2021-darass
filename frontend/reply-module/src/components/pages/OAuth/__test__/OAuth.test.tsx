import { render } from "@testing-library/react";
import OAuth from "..";
import { useOAuth } from "../useOAuth";

jest.mock("../useOAuth");

describe("OAuth test", () => {
  test("OAuth페이지는 LoadingPage를 렌더링 한다.", () => {
    const { queryByAltText } = render(<OAuth />);

    expect(queryByAltText("로딩중")).toBeTruthy();
  });
});
