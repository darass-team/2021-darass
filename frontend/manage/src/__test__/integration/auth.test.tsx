import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import LoginPage from "../../components/pages/LoginPage";
import { useUser } from "../../hooks";
import { User } from "../../types/user";
import { socialLoginUser2 } from "../fixture/user";
import { ROUTE } from "../../constants";
import Nav from "../../components/organisms/Nav";

jest.mock("../../hooks/useUser");

describe("login/logout test", () => {
  test("카카오 로그인 버튼을 누르면 로그인이 되고, 내 프로젝트 페이지로 이동한다.", () => {
    let user: User | undefined = undefined;

    (useUser as jest.Mock).mockImplementation(() => {
      return {
        user,
        login: () => {
          user = { ...socialLoginUser2 };
        },
        logout: () => {
          user = undefined;
        }
      };
    });

    const history = createMemoryHistory();

    const loginPage = render(
      <Router history={history}>
        <LoginPage />
      </Router>
    );

    const kakaoLoginButton = loginPage.getByAltText("kakao");
    fireEvent.click(kakaoLoginButton);

    expect(user).not.toEqual(undefined);
  });

  test("로그아웃버튼을 누르면 로그아웃이 된다.", () => {
    let user: User | undefined = socialLoginUser2;

    // (useUser as jest.Mock).mockImplementation(() => {
    //   return {
    //     user,
    //     login: () => {
    //       user = { ...socialLoginUser2 };
    //     },
    //     logout: () => {
    //       user = undefined;
    //     }
    //   };
    // });

    const history = createMemoryHistory();

    const nav = render(
      <Router history={history}>
        <Nav
          user={user}
          logout={() => {
            user = undefined;
          }}
        />
      </Router>
    );
    const avatarImg = nav.getByAltText("프로필 사진");
    fireEvent.click(avatarImg);

    const logoutButton = nav.getByRole("link", {
      name: /로그아웃/i
    });
    fireEvent.click(logoutButton);

    expect(user).toEqual(undefined);
  });
});
