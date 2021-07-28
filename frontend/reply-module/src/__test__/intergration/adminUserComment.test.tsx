import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CommentList from "../../components/organisms/CommentList";
import { useConfirmGuestPassword, useDeleteComment, useEditComment } from "../../hooks";
import { useLikeComment } from "../../hooks/useLikeComment";
import { comments } from "../fixture/comments";
import { myProject } from "../fixture/project";
import { socialLoginUser } from "../fixture/user";

jest.mock("../../hooks/useEditComment");
jest.mock("../../hooks/useDeleteComment");
jest.mock("../../hooks/useCreateComment");
jest.mock("../../hooks/useConfirmGuestPassword");
jest.mock("../../hooks/useLikeComment");

window.alert = function (str) {
  console.log(str);
  return true;
};

window.confirm = function (str) {
  console.log(str);
  return true;
};

describe("관리자 유저일 때의 동작 테스트", () => {
  beforeEach(() => {
    (useEditComment as jest.Mock).mockImplementation(() => {
      return {
        editComment: () => {},
        isLoading: false,
        error: false
      };
    });

    (useDeleteComment as jest.Mock).mockImplementation(() => {
      return {
        deleteComment: () => {},
        isLoading: false,
        error: false
      };
    });
    (useConfirmGuestPassword as jest.Mock).mockImplementation(() => {
      return {
        isValid: true,
        getPasswordConfirmResult: () => {
          return {
            data: {
              isCorrectPassword: true
            }
          };
        }
      };
    });
    (useLikeComment as jest.Mock).mockImplementation(() => {
      return {
        likeComment: () => {},
        isLoading: false,
        error: false
      };
    });
  });
  test("관리자 유저인 경우, 비회원 유저의 댓글을 삭제할 수 있다.", async () => {
    const user = socialLoginUser;
    const project = myProject;
    const guestComments = comments.filter(comment => comment.user.type === "GuestUser");
    const iAmAdmin = user.id === project.userId;
    expect(iAmAdmin).toBeTruthy();

    const commentList = render(<CommentList user={user} project={project} comments={guestComments} />);
    const allCommentOptions = commentList.getAllByAltText("댓글 옵션");
    expect(allCommentOptions.length).toEqual(guestComments.length);

    const firstCommentOption = allCommentOptions[0];
    fireEvent.click(firstCommentOption);
    const deleteOptionButton = commentList.getByTestId("comment-option-delete-button");
    expect(deleteOptionButton).toBeVisible();
    fireEvent.click(deleteOptionButton);
    await waitFor(() => {
      expect(commentList.getAllByAltText("댓글 옵션").length).toEqual(allCommentOptions.length - 1);
    });
  });
  test("관리자 유저인 경우, 회원 유저의 댓글을 삭제할 수 있다.", async () => {
    const user = socialLoginUser;
    const project = myProject;
    const socialLoginedComments = comments.filter(comment => comment.user.type === "SocialLoginUser");
    const iAmAdmin = user.id === project.userId;
    expect(iAmAdmin).toBeTruthy();

    const commentList = render(<CommentList user={user} project={project} comments={socialLoginedComments} />);
    const allCommentOptions = commentList.getAllByAltText("댓글 옵션");
    expect(allCommentOptions.length).toEqual(socialLoginedComments.length);

    const firstCommentOption = allCommentOptions[0];
    fireEvent.click(firstCommentOption);
    const deleteOptionButton = commentList.getByTestId("comment-option-delete-button");
    expect(deleteOptionButton).toBeVisible();
    fireEvent.click(deleteOptionButton);

    await waitFor(() => {
      expect(commentList.getAllByAltText("댓글 옵션").length).toEqual(allCommentOptions.length - 1);
    });
  });
  test("관리자 유저인 경우, 비회원 유저의 댓글을 수정할 수 없다.", () => {
    const user = socialLoginUser;
    const project = myProject;
    const guestComments = comments.filter(comment => comment.user.type === "GuestUser");
    const iAmAdmin = user.id === project.userId;
    expect(iAmAdmin).toBeTruthy();

    const commentList = render(<CommentList user={user} project={project} comments={guestComments} />);
    const allCommentOptions = commentList.getAllByAltText("댓글 옵션");
    expect(allCommentOptions.length).toEqual(guestComments.length);

    const firstCommentOption = allCommentOptions[0];
    fireEvent.click(firstCommentOption);

    expect(commentList.queryByTestId("comment-option-edit-button")).toBeFalsy();
  });

  test("관라자 유저인 경우, 다른 소셜 로그인 유저가 작성한 댓글을 수정할 수 없다.", () => {
    const user = socialLoginUser;
    const project = myProject;
    const socialLoginedCommentsWrittenByOther = comments.filter(
      comment => comment.user.type === "SocialLoginUser" && comment.user.id !== user.id
    );
    const iAmAdmin = user.id === project.userId;
    expect(iAmAdmin).toBeTruthy();

    const commentList = render(
      <CommentList user={user} project={project} comments={socialLoginedCommentsWrittenByOther} />
    );
    const allCommentOptions = commentList.getAllByAltText("댓글 옵션");
    expect(allCommentOptions.length).toEqual(socialLoginedCommentsWrittenByOther.length);

    const firstCommentOption = allCommentOptions[0];
    fireEvent.click(firstCommentOption);

    expect(commentList.queryByTestId("comment-option-edit-button")).toBeFalsy();
  });
  test("관라자 유저인 경우, 관리자가 작성한 댓글 수정할 수 있다.", () => {
    const user = socialLoginUser;
    const project = myProject;
    const socialLoginedCommentsWrittenByMe = comments.filter(
      comment => comment.user.type === "SocialLoginUser" && comment.user.id === user.id
    );
    const iAmAdmin = user.id === project.userId;
    expect(iAmAdmin).toBeTruthy();

    const commentList = render(
      <CommentList user={user} project={project} comments={socialLoginedCommentsWrittenByMe} />
    );
    const allCommentOptions = commentList.getAllByAltText("댓글 옵션");
    expect(allCommentOptions.length).toEqual(socialLoginedCommentsWrittenByMe.length);

    const firstCommentOption = allCommentOptions[0];
    fireEvent.click(firstCommentOption);

    expect(commentList.queryByTestId("comment-option-edit-button")).toBeTruthy();
  });
});
