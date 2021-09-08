import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getPasswordConfirmResult } from "../../api/getPasswordConfirmResult";
import CommentInput from "../../components/organisms/CommentInput/index";
import CommentList from "../../components/organisms/CommentList";
import { useCreateComment, useDeleteComment, useEditComment } from "../../hooks";
import { useLikeComment } from "../../hooks/useLikeComment";
import { Comment } from "../../types";
import { comments as _comments } from "../fixture/comments";
import { guestUser } from "../fixture/user";

jest.mock("../../hooks/useEditComment");
jest.mock("../../hooks/useDeleteComment");
jest.mock("../../hooks/useCreateComment");
jest.mock("../../hooks/useLikeComment");
jest.mock("../../utils/request");
jest.mock("../../utils/focusContentEditableTextToEnd");
jest.mock("../../api/getPasswordConfirmResult");

window.alert = function (str) {
  console.log(str);
  return true;
};

window.confirm = function (str) {
  console.log(str);
  return true;
};
describe("비로그인 유저 댓글 CRUD 테스트 코드를 작성한다.", () => {
  beforeEach(() => {
    (useCreateComment as jest.Mock).mockImplementation(() => {
      return {
        createComment: () => {},
        isLoading: false,
        error: false
      };
    });
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
    (getPasswordConfirmResult as jest.Mock).mockImplementation(() => {
      return true;
    });
    (useLikeComment as jest.Mock).mockImplementation(() => {
      return {
        likeComment: () => {},
        isLoading: false,
        error: false
      };
    });
  });

  describe("비로그인 유저 댓글 조회", () => {
    test("비로그인 유저인 경우, 비로그인 유저가 작성한 모든 댓글들에 수정/삭제 옵션이 노출된다.", () => {
      const comments: Comment[] = JSON.parse(JSON.stringify(_comments));
      const commentList = render(
        <CommentList
          totalCommentsCount={comments.length}
          isLoading={false}
          comments={comments}
          project={undefined}
          notice={""}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );
      const $$comments = commentList.getAllByTestId("comment");

      $$comments.forEach(($comment, commentIndex) => {
        if (comments[commentIndex]?.user.type === "GuestUser") {
          expect($comment.querySelectorAll("img")[1]).toBeVisible();
        }
      });
    });
  });
  describe("비로그인 유저 댓글 생성", () => {
    test("비로그인 유저인 경우, 댓글 입력에 게스트 비밀번호/이름 입력란이 노출된다.", () => {
      const commentInput = render(<CommentInput user={undefined} />);
      const $commentInputArea = commentInput.container.querySelector("form > div:nth-child(1)");
      const [$guestNickName, $guestPassword] = Array.from(commentInput.container.querySelectorAll("form input"));

      expect($commentInputArea).toBeVisible();
      expect($guestNickName).toBeVisible();
      expect($guestPassword).toBeVisible();
    });

    test("비로그인 유저인 경우, 댓글 생성 시 댓글 내용/작성자 이름/비밀번호를 모두 입력해야 댓글을 작성할 수 있다.", async () => {
      const commentInput = render(<CommentInput user={undefined} />);
      const $commentInputTextArea = commentInput.getByTestId("comment-input-text-box") as HTMLElement;
      const $guestNickName = commentInput.getByPlaceholderText(/이름/i);
      const $guestPassword = commentInput.getByPlaceholderText(/비밀번호/i);
      const $submitButton = commentInput.getByRole("button", {
        name: /등록/i
      }) as HTMLButtonElement;

      fireEvent.input($commentInputTextArea, { target: { textContent: "댓글 내용" } });
      fireEvent.change($guestNickName, { target: { value: "게스트 이름" } });
      fireEvent.change($guestPassword, { target: { value: "게스트 비밀번호" } });

      fireEvent.click($submitButton);

      await waitFor(() => {
        expect(($commentInputTextArea as HTMLTextAreaElement).textContent).toBe("");
        expect(($guestNickName as HTMLInputElement).value).toBe("");
        expect(($guestPassword as HTMLInputElement).value).toBe("");
      });
    });
  });

  describe("비로그인 유저 댓글 수정", () => {
    test("비로그인 유저는 댓글을 수정시, 비밀번호를 입력해야 수정내용 입력란이 활성화 된다.", async () => {
      const comments: Comment[] = JSON.parse(JSON.stringify(_comments));
      const guestUserComments = comments.filter(comment => comment.user.type === "GuestUser");
      const commentList = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={undefined}
          comments={guestUserComments}
          project={undefined}
          notice={""}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

      const firstThreeDotButton = commentList.getAllByAltText("댓글 옵션")[0];
      fireEvent.click(firstThreeDotButton);

      const firstEditButton = commentList.getAllByTestId("comment-option-edit-button")[0];
      fireEvent.click(firstEditButton);

      const firstPasswordSubmitButton = commentList.getByText("입력");
      fireEvent.click(firstPasswordSubmitButton);

      await waitFor(() => {
        const editConfirmButtons = commentList.getByText("등록");
        expect(editConfirmButtons).toBeVisible();
      });
    });
  });

  describe("비로그인 유저 댓글 삭제", () => {
    test("비로그인 유저는 댓글을 수정시, 비밀번호를 입력해야 삭제를 할 수 있다.", async () => {
      const comments: Comment[] = JSON.parse(JSON.stringify(_comments));
      const guestUserComments = comments.filter(comment => comment.user.type === "GuestUser");
      const commentList = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={undefined}
          comments={guestUserComments}
          project={undefined}
          notice={""}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

      const firstThreeDotButton = commentList.getAllByAltText("댓글 옵션")[0];
      fireEvent.click(firstThreeDotButton);

      const firstEditButton = commentList.getByText("삭제");
      fireEvent.click(firstEditButton);

      const firstPasswordSubmitButton = commentList.getByText("입력");
      fireEvent.click(firstPasswordSubmitButton);

      await waitFor(() => {
        const allThreeDots = commentList.getAllByAltText("댓글 옵션");
        expect(allThreeDots.length).toEqual(guestUserComments.length - 1);
      });
    });
  });

  describe("비로그인 유저 댓글 좋아요", () => {
    test("비로그인 유저는 좋아요 기능을 사용할 수 없다.", async () => {
      const comments = JSON.parse(JSON.stringify(_comments));

      (useLikeComment as jest.Mock).mockImplementation(() => {
        return {
          likeComment: () => {},
          isLoading: false,
          error: false
        };
      });

      const { rerender } = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={undefined}
          project={undefined}
          comments={comments}
          notice={""}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

      const likeButton = screen.getAllByTestId("comment-like-button")[0];

      fireEvent.click(likeButton);

      rerender(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={undefined}
          project={undefined}
          comments={comments}
          notice={""}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

      await waitFor(() => {
        expect(screen.queryByTestId("liking-users-button-num-of-likes")).toBeFalsy();
      });
    });
  });
  describe("로그인 유저는 대댓글 기능을 사용할 수 있다.", () => {
    const user = undefined;
    const comments: Comment[] = JSON.parse(JSON.stringify(_comments));
    test("대댓글을 확인할 수 있다.", () => {
      const commentList = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={user}
          project={undefined}
          notice={""}
          comments={comments}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

      const $subComment = commentList.getAllByTestId("subComment")[0];

      expect($subComment).toBeVisible();
      expect($subComment.querySelector('[data-testid="downRightArrowImage"]')).toBeVisible();
    });

    test("대댓글을 작성할 수 있다.", async () => {
      const commentList = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={user}
          project={undefined}
          notice={""}
          comments={comments}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

      const addSubCommentButton = commentList.getAllByText("답글 달기")[0];

      fireEvent.click(addSubCommentButton);

      const subCommentInput = commentList.getByTestId("subCommentInput");
      expect(subCommentInput).toBeVisible();
      expect(commentList.queryByTestId("comment-input-guest-name")).toBeTruthy();
      expect(commentList.queryByTestId("comment-input-guest-password")).toBeTruthy();

      const $commentInputTextArea = commentList.getAllByTestId("comment-input-text-box")[0];
      const $guestNickName = commentList.getAllByPlaceholderText(/이름/i)[0];
      const $guestPassword = commentList.getAllByPlaceholderText(/비밀번호/i)[0];
      const $commentInputSubmitButton = commentList.getAllByTestId("comment-input-submit-button")[0];

      fireEvent.input($commentInputTextArea, { target: { innerText: "두번째 대댓글" } });
      fireEvent.change($guestNickName, { target: { value: "게스트 이름" } });
      fireEvent.change($guestPassword, { target: { value: "게스트 비밀번호" } });
      fireEvent.input($commentInputSubmitButton);

      const newComments = [...comments];
      newComments[0].subComments.push({
        id: 13,
        content: "두번째 대댓글",
        user: guestUser,
        likingUsers: [],
        createdDate: new Date().toDateString(),
        modifiedDate: new Date().toDateString(),
        subComments: []
      });

      commentList.rerender(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={user}
          project={undefined}
          comments={newComments}
          notice={""}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

      await waitFor(() => {
        expect(screen.getAllByTestId("subComment").length).toEqual(2);
      });
    });
  });
});
