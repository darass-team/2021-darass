import { BASE_URL } from "@/constants/api";
import { useToken } from "@/hooks/api/token/useToken";
import { request } from "@/utils/request";
import { render } from "@testing-library/react";
import { useLocation, useParams } from "react-router";
import OAuth from "..";

jest.mock("@/utils/request");
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({
    pathname: BASE_URL
  }),
  useParams: jest.fn().mockReturnValue({
    provider: "KAKAO"
  })
}));
jest.mock("@/hooks/api/token/useToken");

window.close = jest.fn();

describe("OAuth test", () => {
  test("OAuth페이지는 LoadingPage를 렌더링 한다.", () => {
    const { queryByAltText } = render(<OAuth />);

    expect(queryByAltText("로딩중")).toBeTruthy();
  });
});
