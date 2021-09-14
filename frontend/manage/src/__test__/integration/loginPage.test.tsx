import DesktopNav from "@/components/organisms/Nav/DesktopNav";
import Login from "@/components/pages/Login";
import { PROJECT_MENU } from "@/constants";
import { OAUTH_URL } from "@/constants/oauth";
import { within } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import WithContext from "../util/WithContext";

describe("login/logout test", () => {
  describe("로그인 버튼을 누르면, OAUTH 페이지로 이동한다.", () => {
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
    test("DesktopNav - Kakao", () => {
      const Nav = render(
        <WithContext>
          <DesktopNav menuList={PROJECT_MENU.getByProjectId(1)} />
        </WithContext>
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
      const Nav = render(
        <WithContext>
          <DesktopNav menuList={PROJECT_MENU.getByProjectId(1)} />
        </WithContext>
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
      const LoginPage = render(
        <WithContext>
          <Login />
        </WithContext>
      );

      const kakaoLoginButton = LoginPage.getByRole("button", {
        name: /kakao login icon 카카오로 로그인/i
      });

      fireEvent.click(kakaoLoginButton);

      jest.spyOn(window.location, "replace");

      expect(window.location.replace).toBeCalledWith(OAUTH_URL.KAKAO);
    });

    test("LoginPage - Naver", () => {
      const LoginPage = render(
        <WithContext>
          <Login />
        </WithContext>
      );

      const naverLoginButton = LoginPage.getByRole("button", {
        name: /naver login icon 네이버로 로그인/i
      });

      fireEvent.click(naverLoginButton);

      jest.spyOn(window.location, "replace");

      expect(window.location.replace).toBeCalledWith(OAUTH_URL.NAVER);
    });
  });
  test("로그아웃버튼을 누르면, 유저상태가 undefined로 바뀐다.", async () => {
    const Nav = render(
      <WithContext logined>
        <DesktopNav menuList={PROJECT_MENU.getByProjectId(1)} />
      </WithContext>
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

    expect(
      Nav.queryByRole("button", {
        name: /로그인/i
      })
    ).toBeTruthy();
  });
});
