import { render } from "@testing-library/react";
import LoadingPage from "..";

describe("LoadingPage test", () => {
  test("'로딩중' 이미지가 렌더링된다.", () => {
    const { queryByAltText } = render(<LoadingPage />);

    expect(queryByAltText("로딩중")).toBeTruthy();
  });
});
