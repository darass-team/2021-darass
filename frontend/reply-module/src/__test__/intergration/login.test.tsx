import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import UserAvatarOption from "../../components/molecules/UserAvatarOption";
import { useUser } from "../../hooks";
import { User } from "../../types/user";
import { socialLoginUser } from "../fixture/User";

jest.mock("../../hooks");

describe("댓글모듈 Login 기능", () => {
  test("로그인이 되어있지 않다면, UserAvatarOption에 로그인 Option이 노출된다.", async () => {
    let user: User | undefined = undefined;

    (useUser as jest.Mock).mockImplementation(() => {
      return {
        user,
        login: () => {
          user = { ...socialLoginUser };
        },
        logout: () => {
          user = undefined;
        }
      };
    });

    const userAvatarOption = render(
      <UserAvatarOption user={user}>
        {user ? (
          <button type="button" onClick={() => {}}>
            로그아웃
          </button>
        ) : (
          <button type="button" onClick={() => {}}>
            카카오로 로그인
          </button>
        )}
      </UserAvatarOption>
    );

    userAvatarOption.getByRole("img").click();

    await waitFor(() => {
      expect(
        userAvatarOption.getByRole("button", {
          name: /카카오로 로그인/i
        })
      ).toBeInTheDocument();
    });
  });

  test("로그인 되어있다면, UserAvatarOption에 로그아웃 Option이 노출된다.", async () => {
    let user: User | undefined = { ...socialLoginUser };

    (useUser as jest.Mock).mockImplementation(() => {
      return {
        user,
        login: () => {
          user = { ...socialLoginUser };
        },
        logout: () => {
          user = undefined;
        }
      };
    });

    const userAvatarOption = render(
      <UserAvatarOption user={user}>
        {user ? (
          <button type="button" onClick={() => {}}>
            로그아웃
          </button>
        ) : (
          <button type="button" onClick={() => {}}>
            카카오로 로그인
          </button>
        )}
      </UserAvatarOption>
    );

    userAvatarOption.getByRole("img").click();

    await waitFor(async () => {
      userAvatarOption.getByRole("img").click();

      await waitFor(() => {
        expect(
          userAvatarOption.getByRole("button", {
            name: /로그아웃/i
          })
        ).toBeInTheDocument();
      });
    });
  });
});
