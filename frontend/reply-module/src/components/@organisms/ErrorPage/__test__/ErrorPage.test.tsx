import { render } from "@testing-library/react";
import ErrorPage, { Props } from "..";

describe("ErrorPage test", () => {
  test("notice를 인자로 받으면, ErrorNotice컴포넌트와 notice 텍스트가 렌더링된다.", () => {
    const props: Props = {
      notice: "에러메세지"
    };

    const { queryByAltText, queryByText } = render(<ErrorPage {...props} />);

    expect(queryByAltText("error message")).toBeTruthy();
    expect(queryByText("에러메세지")).toBeTruthy();
  });
});
