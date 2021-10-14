import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CommentOption, { Props } from "..";

describe("CommentOption test", () => {
  const onClickEditButton = jest.fn();
  const onClickDeleteButton = jest.fn();
  const onClickViewButton = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("logic test", () => {
    test("수정 버튼을 클릭하면 onClickEditButton 함수가 실행된다.", () => {
      const props: Props = {
        isVisibleEditButton: true,
        isVisibleDeleteButton: false,
        isVisibleViewButton: false,
        onClickEditButton,
        onClickDeleteButton,
        onClickViewButton
      };

      const { getByTestId, getByAltText } = render(<CommentOption {...props} />);

      fireEvent.click(getByAltText("댓글 옵션"));
      fireEvent.click(getByTestId("comment-option-edit-button"));

      expect(onClickEditButton).toHaveBeenCalledTimes(1);
    });
    test("삭제 버튼을 클릭하면 onClickDeleteButton 함수가 실행된다.", () => {
      const props: Props = {
        isVisibleEditButton: false,
        isVisibleDeleteButton: true,
        isVisibleViewButton: false,
        onClickEditButton,
        onClickDeleteButton,
        onClickViewButton
      };

      const { getByTestId, getByAltText } = render(<CommentOption {...props} />);

      fireEvent.click(getByAltText("댓글 옵션"));
      fireEvent.click(getByTestId("comment-option-delete-button"));

      expect(onClickDeleteButton).toHaveBeenCalledTimes(1);
    });
  });

  describe("style test", () => {
    test("isVisibleEditButton=false 이면, OptionIcon을 눌러도 수정 버튼이 보이지 않는다.", () => {
      const props: Props = {
        isVisibleEditButton: false,
        isVisibleDeleteButton: false,
        isVisibleViewButton: false,
        onClickEditButton,
        onClickDeleteButton,
        onClickViewButton
      };

      const { queryByTestId, getByAltText } = render(<CommentOption {...props} />);

      fireEvent.click(getByAltText("댓글 옵션"));

      expect(queryByTestId("comment-option-edit-button")).toBeFalsy();
    });
    test("isVisibleDeleteButton=false 이면, OptionIcon을 눌러도 삭제 버튼이 보이지 않는다.", () => {
      const props: Props = {
        isVisibleEditButton: false,
        isVisibleDeleteButton: false,
        isVisibleViewButton: false,
        onClickEditButton,
        onClickDeleteButton,
        onClickViewButton
      };

      const { queryByTestId, getByAltText } = render(<CommentOption {...props} />);

      fireEvent.click(getByAltText("댓글 옵션"));

      expect(queryByTestId("comment-option-delete-button")).toBeFalsy();
    });
    test("isVisibleEditButton=true 이면, OptionIcon을 눌렀을때 수정 버튼이 보인다.", () => {
      const props: Props = {
        isVisibleEditButton: true,
        isVisibleDeleteButton: false,
        isVisibleViewButton: false,
        onClickEditButton,
        onClickDeleteButton,
        onClickViewButton
      };

      const { queryByTestId, getByAltText } = render(<CommentOption {...props} />);

      fireEvent.click(getByAltText("댓글 옵션"));

      expect(queryByTestId("comment-option-edit-button")).toBeTruthy();
    });
    test("isVisibleDeleteButton=true 이면, OptionIcon을 눌렀을때 삭제 버튼이 보인다.", () => {
      const props: Props = {
        isVisibleEditButton: false,
        isVisibleDeleteButton: true,
        isVisibleViewButton: false,
        onClickEditButton,
        onClickDeleteButton,
        onClickViewButton
      };

      const { queryByTestId, getByAltText } = render(<CommentOption {...props} />);

      fireEvent.click(getByAltText("댓글 옵션"));

      expect(queryByTestId("comment-option-delete-button")).toBeTruthy();
    });
  });
});
