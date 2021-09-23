import DesktopNav from "@/components/organisms/Nav/DesktopNav";
import Login from "@/components/pages/Login";
import { PROJECT_MENU } from "@/constants";
import { OAUTH_URL } from "@/constants/oauth";
import { within } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { useUser } from "@/hooks";
import { socialLoginUser } from "../fixture/user";
import { User } from "@/types/user";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

jest.mock("@/hooks");

describe("login/logout test", () => {
  describe("로그인 버튼을 누르면, OAUTH 페이지로 이동한다.", () => {
    beforeEach(() => {
      (useUser as jest.Mock).mockImplementation(() => {
        return {
          user: undefined,
          isLoading: false,
          error: undefined,
          refetch: jest.fn(),
          logout: () => {},
          isSuccess: true
        };
      });

      Object.defineProperty(window, "location", {
        writable: true,
        value: { replace: jest.fn() }
      });

      const intersectionObserverMock = () => ({
        observe: () => null
      });
      window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
    });
    test("DesktopNav - Kakao", () => {
      const history = createMemoryHistory();
      const Nav = render(
        <Router history={history}>
          <DesktopNav menuList={PROJECT_MENU.getByProjectId(1)} />
        </Router>
      );

      const DropDownButton = Nav.getByAltText("유저 옵션 드롭다운 버튼");
      fireEvent.click(DropDownButton);

      const navigation = Nav.getByRole("navigation");

      const kakaoLoginButton = within(navigation).getByRole("button", {
        name: /카카오/i
      });

      fireEvent.click(kakaoLoginButton);

      expect(window.location.replace).toBeCalledWith(OAUTH_URL.KAKAO);
    });

    test("DesktopNav - Naver", () => {
      const history = createMemoryHistory();
      const Nav = render(
        <Router history={history}>
          <DesktopNav menuList={PROJECT_MENU.getByProjectId(1)} />
        </Router>
      );

      const DropDownButton = Nav.getByAltText("유저 옵션 드롭다운 버튼");
      fireEvent.click(DropDownButton);

      const navigation = Nav.getByRole("navigation");

      const naverLoginButton = within(navigation).getByRole("button", {
        name: /네이버/i
      });

      fireEvent.click(naverLoginButton);

      expect(window.location.replace).toBeCalledWith(OAUTH_URL.NAVER);
    });

    test("LoginPage - Kakao", () => {
      const history = createMemoryHistory();
      const LoginPage = render(
        <Router history={history}>
          <Login />
        </Router>
      );

      const kakaoLoginButton = LoginPage.getByRole("button", {
        name: /kakao login icon 카카오로 로그인/i
      });

      fireEvent.click(kakaoLoginButton);

      jest.spyOn(window.location, "replace");

      expect(window.location.replace).toBeCalledWith(OAUTH_URL.KAKAO);
    });

    test("LoginPage - Naver", () => {
      const history = createMemoryHistory();
      const LoginPage = render(
        <Router history={history}>
          <Login />
        </Router>
      );

      const naverLoginButton = LoginPage.getByRole("button", {
        name: /naver login icon 네이버로 로그인/i
      });

      fireEvent.click(naverLoginButton);

      jest.spyOn(window.location, "replace");

      expect(window.location.replace).toBeCalledWith(OAUTH_URL.NAVER);
    });
  });

  describe("", () => {
    beforeEach(() => {
      Object.defineProperty(window, "location", {
        writable: true,
        value: { replace: jest.fn() }
      });

      const intersectionObserverMock = () => ({
        observe: () => null
      });
      window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
    });

    test("로그아웃버튼을 누르면, 유저상태가 undefined로 바뀐다.", async () => {
      let user: User | undefined = socialLoginUser;

      (useUser as jest.Mock).mockImplementation(() => {
        return {
          user,
          isLoading: false,
          error: undefined,
          refetch: () => {},
          logout: () => {
            user = undefined;
          },
          isSuccess: true
        };
      });

      const history = createMemoryHistory();
      const Nav = render(
        <Router history={history}>
          <DesktopNav menuList={PROJECT_MENU.getByProjectId(1)} />
        </Router>
      );

      const DropDownButton = Nav.getByRole("img", {
        name: /유저 프로필 이미지/i
      });
      fireEvent.click(DropDownButton);

      const navigation = Nav.getByRole("navigation");
      const logoutButton = within(navigation).getByRole("link", {
        name: /로그아웃/i
      });
      fireEvent.click(logoutButton);

      expect(user).toBeUndefined();
    });
  });
});
