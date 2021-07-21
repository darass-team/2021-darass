import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import CommentList from "../../components/organisms/CommentList";
import { comments } from "../fixture/comments";
import { useEditComment, useDeleteComment } from "../../hooks";
import { Comment } from "../../types";

jest.mock("../../hooks/useEditComment");
jest.mock("../../hooks/useDeleteComment");

describe("비로그인 유저 댓글 조회", () => {
  test("비로그인 유저인 경우, 비로그인 유저가 작성한 모든 댓글들에 수정/삭제 옵션이 노출된다.", () => {
    const _comments: Comment[] = JSON.parse(JSON.stringify(comments));

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

    const commentList = render(<CommentList comments={_comments} />);

    const $$comments = commentList.container.querySelectorAll("section > div:nth-child(2) > div");

    $$comments.forEach(($comment, index) => {
      if (_comments[index].user.type === "GuestUser") {
        expect($comment.querySelectorAll("img")[1]).toBeVisible();
      } else {
        expect($comment.querySelectorAll("img")[1]).toBe(undefined);
      }
    });
  });

  test("비로그인 유저인 경우, 모든 댓글들이 왼쪽에 정렬된다", async () => {
    const _comments: Comment[] = JSON.parse(JSON.stringify(comments));

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

    const commentList = render(<CommentList comments={_comments} />);

    await waitFor(() => {
      const $$comments = commentList.container.querySelectorAll("section > div:nth-child(2) > div");

      $$comments.forEach(($comment, index) => {
        if (_comments[index].user.type === "GuestUser") {
          console.log($comment);

          expect($comment).toHaveStyle("flex-direction: row");
        }
      });
    });
  });
});

describe("비로그인 유저 댓글 생성", () => {});

describe("비로그인 유저 댓글 수정", () => {});
describe("비로그인 유저 댓글 삭제", () => {});
