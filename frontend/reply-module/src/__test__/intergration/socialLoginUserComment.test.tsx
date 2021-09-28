import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { comments as _comments } from "../fixture/comments";
import { socialLoginUser } from "../fixture/user";
import CommentList from "../../components/organisms/CommentList";
import { useCreateComment, useDeleteComment, useEditComment, useLikeComment } from "../../hooks";
import CommentInput from "../../components/organisms/CommentInput";
import { getTotalCommentsCount } from "../util/getTotalCommentsCount";
import { Comment } from "../../types";

jest.mock("../../hooks/api/comment/useCreateComment");
jest.mock("../../hooks/api/comment/useEditComment");
jest.mock("../../hooks/api/comment/useDeleteComment");
jest.mock("../../hooks/api/comment/useCreateComment");
jest.mock("../../hooks/api/comment/useLikeComment");
jest.mock("../../utils/focusContentEditableTextToEnd");

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
    (useCreateComment as jest.Mock).mockImplementation(() => {
      return {
        createComment: () => true
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

    (useLikeComment as jest.Mock).mockImplementation(() => {
      return {
        likeComment: () => {},
        isLoading: false,
        error: false
      };
    });
  });

  describe("로그인 유저 댓글 조회", () => {
    test("로그인 유저는 모든 댓글을 조회할 수 있다.", () => {
      const user = socialLoginUser;
      const comments = JSON.parse(JSON.stringify(_comments));
      const totalCommentsCount = getTotalCommentsCount(comments);
      const commentList = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={user}
          comments={comments}
          projectOwnerId={undefined}
          notice={""}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

      const totalElementCommentsCount =
        commentList.getAllByTestId("comment").length + commentList.getAllByTestId("subComment").length;
      expect(totalElementCommentsCount).toEqual(totalCommentsCount);
    });
  });
  describe("로그인 유저 댓글 생성", () => {
    test("로그인 유저는 비밀번호와 이름을 입력하지 않고, 댓글을 생성할 수 있다.", async () => {
      const user = socialLoginUser;

      const commentInput = render(<CommentInput user={user} />);

      const commentInputTextArea = commentInput.getByTestId("comment-input-text-box");
      expect(commentInput.queryByTestId("comment-input-guest-name")).toBeFalsy();
      expect(commentInput.queryByTestId("comment-input-guest-password")).toBeFalsy();

      fireEvent.input(commentInputTextArea, { target: { innerText: "곤이" } });

      const submitButton = commentInput.getAllByRole("button", {
        name: /등록/i
      })[0];
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
      const commentList = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={user}
          projectOwnerId={undefined}
          notice={""}
          comments={myComments}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

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
      const commentList = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={user}
          projectOwnerId={undefined}
          notice={""}
          comments={commentsWrittenByOthers}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

      expect(commentList.queryAllByTestId("comment-option").length).toEqual(0);
    });
  });
  describe("로그인 유저 댓글 삭제", () => {
    test("로그인 유저이면서 관리자가 아닌 유저는, 자신의 댓글의 삭제할 수 있다.", async () => {
      const user = socialLoginUser;
      const commentsWrittenByOthers = JSON.parse(
        JSON.stringify(_comments.filter(comment => comment.user.id === user.id))
      );
      const commentList = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={user}
          projectOwnerId={undefined}
          notice={""}
          comments={commentsWrittenByOthers}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

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

      const commentList = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={user}
          projectOwnerId={undefined}
          notice={""}
          comments={commentsWrittenByOthers}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

      expect(commentList.queryAllByTestId("comment-option").length).toEqual(0);
    });
  });
  describe("로그인 유저는 좋아요 기능을 사용할 수 있다.", () => {
    test("좋아요를 누르지 않은 댓글에 좋아요를 누르면 좋아요 숫자가 올라간다.", async () => {
      const user = socialLoginUser;
      const comments = JSON.parse(JSON.stringify(_comments));

      (useLikeComment as jest.Mock).mockImplementation(() => {
        return {
          likeComment: () => {
            comments[0].likingUsers.push(user);
          },
          isLoading: false,
          error: false
        };
      });

      const { rerender } = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={user}
          projectOwnerId={undefined}
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
          user={user}
          projectOwnerId={undefined}
          comments={comments}
          notice={""}
          sortOption={"oldest"}
          onSelectSortOption={() => {}}
        />
      );

      await waitFor(() => {
        const numOfLikes = screen.getAllByTestId("liking-users-button-num-of-likes")[0];
        expect(numOfLikes).toHaveTextContent("1");
      });
    });
  });

  test("좋아요를 누른 상태에서 좋아요를 한 번 더 누르면 좋아요가 취소된다.", async () => {
    const user = socialLoginUser;
    const comments = JSON.parse(JSON.stringify(_comments)) as Comment[];
    comments[0].likingUsers.push(user);

    (useLikeComment as jest.Mock).mockImplementation(() => {
      return {
        likeComment: () => {
          comments[0].likingUsers.pop();
        },
        isLoading: false,
        error: false
      };
    });

    const { rerender } = render(
      <CommentList
        totalCommentsCount={_comments.length}
        isLoading={false}
        user={user}
        projectOwnerId={undefined}
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
        user={user}
        projectOwnerId={undefined}
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

  describe("로그인 유저는 대댓글 기능을 사용할 수 있다.", () => {
    const user = socialLoginUser;
    const comments: Comment[] = JSON.parse(JSON.stringify(_comments));
    test("대댓글을 확인할 수 있다.", () => {
      const commentList = render(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={user}
          projectOwnerId={undefined}
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
          projectOwnerId={undefined}
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
      expect(commentList.queryByTestId("comment-input-guest-name")).toBeFalsy();
      expect(commentList.queryByTestId("comment-input-guest-password")).toBeFalsy();

      const $commentInputTextArea = commentList.getAllByTestId("comment-input-text-box")[0];
      const $commentInputSubmitButton = commentList.getAllByTestId("comment-input-submit-button")[0];

      fireEvent.input($commentInputTextArea, { target: { innerText: "두번째 대댓글" } });
      fireEvent.input($commentInputSubmitButton);
      const newComments = [...comments];
      newComments[0].subComments.push({
        id: 13,
        content: "두번째 대댓글",
        user: user,
        likingUsers: [],
        createdDate: new Date().toDateString(),
        modifiedDate: new Date().toDateString(),
        subComments: [],
        url: ""
      });

      commentList.rerender(
        <CommentList
          totalCommentsCount={_comments.length}
          isLoading={false}
          user={user}
          projectOwnerId={undefined}
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
