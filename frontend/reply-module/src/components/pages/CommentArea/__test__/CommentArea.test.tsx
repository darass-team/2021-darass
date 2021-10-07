import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import { fireEvent, render } from "@testing-library/react";
import CommentArea from "..";
import { useCommentArea } from "../useCommentArea";

jest.mock("../useCommentArea");

describe("CommentArea test", () => {
  test("projectOwnerId && !getProjectOwnerIdLoading && !commentsLoading 가 true이면 CommentList가 렌더링된다.", () => {
    (useCommentArea as jest.Mock).mockImplementation(() => {
      return {
        projectOwnerId: socialLoginUser.id,
        getProjectOwnerIdLoading: false,
        commentsLoading: false,
        user: socialLoginUser,
        totalCommentsCount: comments.length,
        comments,
        sortOption: "oldest",
        onSelectSortOption: jest.fn(),
        notice: "",
        logout: jest.fn(),
        onLogin: jest.fn()
      };
    });

    const { queryByTestId } = render(<CommentArea />);

    expect(queryByTestId("comment-list")).toBeTruthy();
  });
  test("projectOwnerId && !getProjectOwnerIdLoading && !commentsLoading 가 false이면 LoadingPage가 렌더링된다.", () => {
    (useCommentArea as jest.Mock).mockImplementation(() => {
      return {
        projectOwnerId: undefined,
        getProjectOwnerIdLoading: true,
        commentsLoading: true,
        user: undefined,
        totalCommentsCount: comments.length,
        comments,
        sortOption: "oldest",
        onSelectSortOption: jest.fn(),
        notice: "",
        logout: jest.fn(),
        onLogin: jest.fn()
      };
    });

    const { queryByAltText } = render(<CommentArea />);

    expect(queryByAltText("로딩중")).toBeTruthy();
  });

  test("user가 없을때, '카카오톡 로그인 이미지'를 클릭하면 onLogin('KAKAO')가 실행된다.", () => {
    const onLogin = jest.fn();

    (useCommentArea as jest.Mock).mockImplementation(() => {
      return {
        projectOwnerId: undefined,
        getProjectOwnerIdLoading: true,
        commentsLoading: true,
        user: undefined,
        totalCommentsCount: comments.length,
        comments,
        sortOption: "oldest",
        onSelectSortOption: jest.fn(),
        notice: "",
        logout: jest.fn(),
        onLogin
      };
    });

    const { getByAltText } = render(<CommentArea />);
    fireEvent.click(getByAltText("카카오톡 로그인 이미지"));

    expect(onLogin).toHaveBeenLastCalledWith("KAKAO");
  });
  test("user가 없을때, '네아버 로그인 이미지'를 클릭하면 onLogin('NAVER')가 실행된다.", () => {
    const onLogin = jest.fn();

    (useCommentArea as jest.Mock).mockImplementation(() => {
      return {
        projectOwnerId: undefined,
        getProjectOwnerIdLoading: true,
        commentsLoading: true,
        user: undefined,
        totalCommentsCount: comments.length,
        comments,
        sortOption: "oldest",
        onSelectSortOption: jest.fn(),
        notice: "",
        logout: jest.fn(),
        onLogin
      };
    });

    const { getByAltText } = render(<CommentArea />);
    fireEvent.click(getByAltText("네아버 로그인 이미지"));

    expect(onLogin).toHaveBeenLastCalledWith("NAVER");
  });
});
