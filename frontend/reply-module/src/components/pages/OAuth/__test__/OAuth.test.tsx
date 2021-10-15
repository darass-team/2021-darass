import { BASE_URL } from "@/constants/api";
import { render } from "@testing-library/react";
import OAuth from "..";

jest.mock("@/utils/request");
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({
    pathname: BASE_URL
  }),
  useHistory: jest.fn(),
  useParams: jest.fn().mockReturnValue({
    provider: "KAKAO"
  })
}));

window.close = jest.fn();

describe("OAuth test", () => {
  test("OAuth페이지는 LoadingPage를 렌더링 한다.", () => {
    const { queryByAltText } = render(<OAuth />);

    expect(queryByAltText("로딩중")).toBeTruthy();
  });
});
