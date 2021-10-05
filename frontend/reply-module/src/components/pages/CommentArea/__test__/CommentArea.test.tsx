import { render, fireEvent } from "@testing-library/react";
import { comments } from "@/__test__/fixture/comments";
import { socialLoginUser } from "@/__test__/fixture/user";
import { useCommentArea } from "../useCommentArea";
import CommentArea from "..";
import { useComment } from "@/components/organisms/Comment/useComment";
import { useCommentInput } from "@/components/molecules/CommentInput/useCommentInput";
import { useUserAvatarOption } from "@/components/molecules/UserAvatarOption/useUserAvatarOption";

jest.mock("../useCommentArea");
jest.mock("@/components/molecules/UserAvatarOption/useUserAvatarOption");
jest.mock("@/components/organisms/Comment/useComment");
jest.mock("@/components/molecules/CommentInput/useCommentInput");

(useUserAvatarOption as jest.Mock).mockImplementation(() => {
  return {
    onClickAlarmIcon: jest.fn(),
    avatarImageURL: "",
    onClickUserNickName: jest.fn(),
    isShowOptionBox: false,
    onCloseShowOptionBox: jest.fn(),
    hasNewAlarmOnRealTime: false,
    onClickAvatar: jest.fn()
  };
});

(useCommentInput as jest.Mock).mockImplementation(() => {
  return {
    onSubmit: jest.fn(),
    $contentEditable: null,
    onInput: jest.fn(),
    isFormSubmitted: false,
    isValidCommentInput: false,
    isValidGuestNickName: false,
    isValidGuestPassword: false,
    content: "",
    guestNickName: "",
    onChangeGuestNickName: jest.fn(),
    isSubCommentInput: false,
    guestPassword: "",
    onChangeGuestPassword: jest.fn()
  };
});

(useComment as jest.Mock).mockImplementation(() => {
  return {
    user: socialLoginUser,
    projectOwnerId: 1,
    comment: comments[0],
    isVisibleCommentOption: false,
    iAmAdmin: false,
    iAmGuestUser: false,
    thisCommentIsWrittenByAdmin: false,
    thisCommentIsWrittenByGuest: false,
    thisCommentIsMine: false,
    isSubComment: false,
    alreadyLiked: false,
    hasSubComments: false,
    hasLikingUser: false,
    canIEdit: false,
    canIDelete: false
  };
});

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
