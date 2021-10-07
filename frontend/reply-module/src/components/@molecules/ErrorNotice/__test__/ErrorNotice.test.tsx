import { render } from "@testing-library/react";
import ErrorNotice, { Props } from "..";

describe("ErrorNotice test", () => {
  test("children에 들어간 문구가, 에러페이지의 내용에 정상적으로 렌더링 된다.", () => {
    const props: Props = {
      children: "예상치못한 에러가 발생했습니다."
    };

    const { queryByAltText, queryByText } = render(<ErrorNotice {...props} />);

    expect(queryByAltText("error message")).toBeTruthy();
    expect(queryByText("예상치못한 에러가 발생했습니다.")).toBeTruthy();
  });
});
