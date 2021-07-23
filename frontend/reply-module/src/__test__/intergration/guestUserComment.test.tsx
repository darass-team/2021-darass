import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CommentInput from "../../components/organisms/CommentInput/index";
import CommentList from "../../components/organisms/CommentList";
import { useCreateComment, useDeleteComment, useEditComment, useConfirmGuestPassword } from "../../hooks";
import { Comment } from "../../types";
import { comments } from "../fixture/comments";

jest.mock("../../hooks/useEditComment");
jest.mock("../../hooks/useDeleteComment");
jest.mock("../../hooks/useCreateComment");
jest.mock("../../hooks/useConfirmGuestPassword");
jest.mock("../../utils/request");

window.alert = function (str) {
  console.log(str);
  return true;
};

window.confirm = function (str) {
  console.log(str);
  return true;
};
describe("비로그인 유저 댓글 조회", () => {
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
        getPasswordConfirmResult: () => true
      };
    });
  });
  test("비로그인 유저인 경우, 비로그인 유저가 작성한 모든 댓글들에 수정/삭제 옵션이 노출된다.", () => {
    const _comments: Comment[] = JSON.parse(JSON.stringify(comments));
    const commentList = render(<CommentList comments={_comments} project={undefined} />);
    const $$comments = commentList.container.querySelectorAll("section > div:nth-child(2) > div");

    $$comments.forEach(($comment, index) => {
      if (_comments[index].user.type === "GuestUser") {
        expect($comment.querySelectorAll("img")[1]).toBeVisible();
      }
    });
  });

  test("비로그인 유저인 경우, 모든 댓글들이 왼쪽에 정렬된다", async () => {
    const _comments: Comment[] = JSON.parse(JSON.stringify(comments));
    const commentList = render(<CommentList comments={_comments} project={undefined} />);

    await waitFor(() => {
      const $$comments = commentList.container.querySelectorAll("section > div:nth-child(2) > div");

      $$comments.forEach(($comment, index) => {
        if (_comments[index].user.type === "GuestUser") {
          expect($comment).toHaveStyle("flex-direction: row");
        }
      });
    });
  });
});

describe("비로그인 유저 댓글 생성", () => {
  beforeEach(() => {
    (useCreateComment as jest.Mock).mockImplementation(() => {
      return {
        createComment: () => {}
      };
    });
  });
  test("비로그인 유저인 경우, 댓글 입력에 게스트 비밀번호/이름 입력란이 노출된다.", () => {
    const commentInput = render(<CommentInput user={undefined} url={null} projectSecretKey={null} />);
    const $commentInputArea = commentInput.container.querySelector("textarea");
    const [$guestNickName, $guestPassword] = Array.from(commentInput.container.querySelectorAll("form  input"));

    expect($commentInputArea).toBeVisible();
    expect($guestNickName).toBeVisible();
    expect($guestPassword).toBeVisible();
  });

  test("비로그인 유저인 경우, 댓글 생성 시 댓글 내용/작성자 이름/비밀번호를 모두 입력해야 댓글을 작성할 수 있다.", async () => {
    const commentInput = render(<CommentInput user={undefined} url={null} projectSecretKey={null} />);
    const $commentInputArea = commentInput.container.querySelector("textarea") as HTMLElement;
    const [$guestNickName, $guestPassword] = Array.from(commentInput.container.querySelectorAll("form  input"));
    const $submitButton = commentInput.container.querySelector("button") as HTMLButtonElement;

    fireEvent.change($commentInputArea, { target: { value: "댓글 내용" } });
    fireEvent.change($guestNickName, { target: { value: "게스트 이름" } });
    fireEvent.change($guestPassword, { target: { value: "게스트 비밀번호" } });

    fireEvent.click($submitButton);

    await waitFor(() => {
      expect(($commentInputArea as HTMLTextAreaElement).value).toBe("");
      expect(($guestNickName as HTMLInputElement).value).toBe("");
      expect(($guestPassword as HTMLInputElement).value).toBe("");
    });

    fireEvent.change($commentInputArea, { target: { value: "댓글 내용" } });
    fireEvent.change($guestNickName, { target: { value: "게스트 이름" } });
    fireEvent.change($guestPassword, { target: { value: "게스트 비밀번호" } });

    fireEvent.click($submitButton);

    await waitFor(() => {
      expect(($commentInputArea as HTMLTextAreaElement).value).toBe("댓글 내용");
      expect(($guestNickName as HTMLInputElement).value).toBe("게스트 이름");
      expect(($guestPassword as HTMLInputElement).value).toBe("게스트 비밀번호");
    });
  });
});

describe("비로그인 유저 댓글 수정", () => {
  beforeEach(() => {
    // (request as jest.Mock).mockImplementation(() => {});

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
        getPasswordConfirmResult: () => true
      };
    });
  });
  test("비로그인 유저는 댓글을 수정시, 비밀번호를 입력해야 수정내용 입력란이 활성화 된다.", async () => {
    const _comments: Comment[] = JSON.parse(JSON.stringify(comments));
    const guestUserComments = _comments.filter(comment => comment.user.type === "GuestUser");
    const commentList = render(<CommentList user={undefined} comments={guestUserComments} project={undefined} />);

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
        getPasswordConfirmResult: () => true
      };
    });
  });
  test("비로그인 유저는 댓글을 수정시, 비밀번호를 입력해야 삭제를 할 수 있다.", async () => {
    const _comments: Comment[] = JSON.parse(JSON.stringify(comments));
    const guestUserComments = _comments.filter(comment => comment.user.type === "GuestUser");
    const commentList = render(<CommentList comments={guestUserComments} project={undefined} />);

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
