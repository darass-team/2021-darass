import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { comments as _comments } from "../fixture/comments";
import { socialLoginUser } from "../fixture/user";
import CommentList from "../../components/organisms/CommentList";
import { useCreateComment, useConfirmGuestPassword, useDeleteComment, useEditComment } from "../../hooks";
import CommentArea from "../../components/templates/CommentArea";
import CommentInput from "../../components/organisms/CommentInput";

jest.mock("../../hooks/useCreateComment");
jest.mock("../../hooks/useEditComment");
jest.mock("../../hooks/useDeleteComment");
jest.mock("../../hooks/useCreateComment");
jest.mock("../../hooks/useConfirmGuestPassword");

window.alert = function (str) {
  console.log(str);
  return true;
};

window.confirm = function (str) {
  console.log(str);
  return true;
};

describe("로그인 유저의 댓글 CRUD 테스트 코드를 작성한다.", () => {
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
  });

  describe("로그인 유저 댓글 조회", () => {
    test("로그인 유저는 모든 댓글을 조회할 수 있다.", () => {
      const user = socialLoginUser;
      const comments = JSON.parse(JSON.stringify(_comments));
      const commentList = render(<CommentList user={user} comments={comments} project={undefined} />);

      expect(commentList.getAllByTestId("comment").length).toEqual(comments.length);
    });
  });
  describe("로그인 유저 댓글 생성", () => {
    beforeEach(() => {
      (useCreateComment as jest.Mock).mockImplementation(() => {
        return {
          createComment: () => true
        };
      });
    });

    test("로그인 유저는 비밀번호와 이름을 입력하지 않고, 댓글을 생성할 수 있다.", async () => {
      const user = socialLoginUser;

      const commentInput = render(<CommentInput user={user} url="" projectSecretKey="" />);

      const commentInputTextArea = commentInput.getByTestId("comment-input-textarea");
      expect(commentInput.queryByTestId("comment-input-guest-name")).toBeFalsy();
      expect(commentInput.queryByTestId("comment-input-guest-password")).toBeFalsy();

      fireEvent.change(commentInputTextArea, { target: { value: "곤이" } });

      const submitButton = commentInput.getByTestId("comment-input-submit-button");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(commentInputTextArea.textContent).toEqual("");
      });
    });
  });
  describe("로그인 유저 댓글 수정", () => {
    test("로그인 유저는, 자신의 댓글을 비밀번호 입력 없이 수정할 수 있다.", async () => {
      const user = socialLoginUser;
      const myComments = JSON.parse(JSON.stringify(_comments.filter(comment => comment.user.id === user.id)));
      const commentList = render(<CommentList user={user} project={undefined} comments={myComments} />);

      const firstCommentOption = commentList.getAllByTestId("comment-option")[0];
      fireEvent.click(firstCommentOption);

      const editButton = commentList.getByTestId("comment-option-edit-button");
      fireEvent.click(editButton);

      expect(commentList.queryByTestId("comment-guest-password-input")).toBeFalsy();
      expect(commentList.queryByTestId("comment-guest-password-cancel-button")).toBeFalsy();
      expect(commentList.queryByTestId("comment-guest-password-submit-button")).toBeFalsy();

      const contentEditableInput = commentList.getAllByTestId("comment-text-box-contenteditable-input")[0];
      fireEvent.input(contentEditableInput, { target: { innerText: "수정된 댓글입니다." } });

      const contentEditableSubmitButton = commentList.getByTestId("comment-text-box-submit-button");
      fireEvent.click(contentEditableSubmitButton);

      await waitFor(() => {
        expect(commentList.queryByTestId("comment-text-box-submit-button")).toBeFalsy();
      });
    });
    test("로그인 유저이면서 관리자가 아닌 유저는, 다른 소셜 로그인 회원 및 비로그인 유저의 댓글을 수정할 수 없다.", async () => {
      const user = socialLoginUser;
      const commentsWrittenByOthers = JSON.parse(
        JSON.stringify(_comments.filter(comment => comment.user.id !== user.id))
      );
      const commentList = render(<CommentList user={user} project={undefined} comments={commentsWrittenByOthers} />);

      expect(commentList.queryAllByTestId("comment-option").length).toEqual(0);
    });
  });
  describe("로그인 유저 댓글 삭제", () => {
    test("로그인 유저이면서 관리자가 아닌 유저는, 자신의 댓글의 삭제할 수 있다.", async () => {
      const user = socialLoginUser;
      const commentsWrittenByOthers = JSON.parse(
        JSON.stringify(_comments.filter(comment => comment.user.id === user.id))
      );
      const commentList = render(<CommentList user={user} project={undefined} comments={commentsWrittenByOthers} />);

      const firstCommentOption = commentList.getAllByTestId("comment-option")[0];
      fireEvent.click(firstCommentOption);

      const firstDeleteButton = commentList.getByTestId("comment-option-delete-button");
      fireEvent.click(firstDeleteButton);

      await waitFor(() => {
        expect(commentList.queryAllByTestId("comment-option").length).toEqual(commentsWrittenByOthers.length - 1);
      });
    });

    test("로그인 유저이면서 관리자가 아닌 유저는, 자신의 댓글이 아닌 댓글을 삭제할 수 없다.", async () => {
      const user = socialLoginUser;
      const commentsWrittenByOthers = JSON.parse(
        JSON.stringify(_comments.filter(comment => comment.user.id !== user.id))
      );

      const commentList = render(<CommentList user={user} project={undefined} comments={commentsWrittenByOthers} />);

      expect(commentList.queryAllByTestId("comment-option").length).toEqual(0);
    });
  });
});
