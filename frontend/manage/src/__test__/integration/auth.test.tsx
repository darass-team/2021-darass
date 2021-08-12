import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import DesktopNav from "../../components/organisms/DesktopNav";
import Login from "../../components/pages/Login";
import { PROJECT_MENU } from "../../constants";
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

    const nav = render(
      <Router history={history}>
        <DesktopNav menuList={PROJECT_MENU.get(1)} />
      </Router>
    );

    const DropDownButton = nav.getByAltText("유저 옵션 드롭다운 버튼");
    fireEvent.click(DropDownButton);

    const logoutButton = nav.getByRole("link", {
      name: /로그아웃/i
    });
    fireEvent.click(logoutButton);

    expect(user).toEqual(undefined);
  });
});
