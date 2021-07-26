import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Nav from "../../components/organisms/Nav";
import Login from "../../components/pages/Login";
import { useUser } from "../../hooks";
import { User } from "../../types/user";
import { socialLoginUser2 } from "../fixture/user";

jest.mock("../../hooks/useUser");

describe("login/logout test", () => {
  test("카카오 로그인 버튼을 누르면, 유저 상태가 undefined가 아니다.", () => {
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

    const loginPage = render(<Login />);

    const kakaoLoginButton = loginPage.getByAltText("kakao");
    fireEvent.click(kakaoLoginButton);

    expect(user).not.toEqual(undefined);
  });

  test("로그아웃버튼을 누르면, 유저상태가 undefined로 바뀐다.", () => {
    let user: User | undefined = socialLoginUser2;

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
