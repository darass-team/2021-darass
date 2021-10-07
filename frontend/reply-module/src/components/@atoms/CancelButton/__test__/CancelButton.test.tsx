import { PALETTE } from "@/constants/styles/palette";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CancelButton from "..";

describe("CancelButton test", () => {
  describe("style test", () => {
    test("기본 스타일 테스트", () => {
      const text = "취소버튼";
      const cancelButton = render(<CancelButton onClick={() => {}}>{text}</CancelButton>);
      const button = cancelButton.getByText(text);

      expect(button).toHaveStyle(`color: ${PALETTE.RED_800}`);
      expect(button).toHaveStyle(`background-color: ${PALETTE.GRAY_200}`);
    });
  });
});
