import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import { JSDOM } from "jsdom";
import CommentPage from "../../components/pages/CommentPage";
import { useLogin } from "../../hooks";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

jest.mock("../../hooks");

global.document = new JSDOM().window.document;

const login = async (page: RenderResult) => {
  page.getByRole("img").click();
  await waitFor(() => {
    page
      .getByRole("button", {
        name: /카카오로 로그인/i
      })
      .click();
  });
};

const logout = async (page: RenderResult) => {
  page.getByRole("img").click();
  await waitFor(() => {
    page
      .getByRole("button", {
        name: /로그아웃/i
      })
      .click();
  });
};

describe("댓글모듈 Login 기능", () => {
  test("로그인이 되어있지 않다면, UserAvatarOption에 로그인 Option이 노출된다.", async () => {
    (useLogin as jest.Mock).mockImplementation(() => {
      return {
        user: null,
        login: () => {},
        logout: () => {}
      };
    });

    const commentPage = render(<CommentPage />);

    commentPage.getByRole("img").click();

    await waitFor(() => {
      expect(
        commentPage.getByRole("button", {
          name: /카카오로 로그인/i
        })
      ).toBeInTheDocument();
    });
  });

  test("로그인 되어있다면, UserAvatarOption에 로그아웃 Option이 노출된다.", async () => {
    (useLogin as jest.Mock).mockImplementation(() => {
      return {
        user: { id: 1, imageURL: "", nickName: "", type: "" },
        login: () => {},
        logout: () => {}
      };
    });

    const commentPage = render(<CommentPage />);

    login(commentPage);

    await waitFor(async () => {
      commentPage.getByRole("img").click();

      await waitFor(() => {
        expect(
          commentPage.getByRole("button", {
            name: /로그아웃/i
          })
        ).toBeInTheDocument();
      });
    });
  });

  test("로그인에 성공했다면 cookie에 accessToken이 저장된다.", async () => {
    (useLogin as jest.Mock).mockImplementation(() => {
      return {
        user: null,
        login: () => {
          setCookie("accessToken", "test");
        },
        logout: () => {}
      };
    });
    const commentPage = render(<CommentPage />);

    login(commentPage);

    expect(getCookie("accessToken")).toBe("test");
  });

  test("로그아웃에 성공했다면 cookie에 accessToken이 삭제된다. ", async () => {
    (useLogin as jest.Mock).mockImplementation(() => {
      return {
        user: { id: 1, imageURL: "", nickName: "", type: "" },
        login: () => {},
        logout: () => {
          deleteCookie("accessToken");
        }
      };
    });

    const commentPage = render(<CommentPage />);

    logout(commentPage);

    expect(getCookie("accessToken")).toBe(null);
  });
});
