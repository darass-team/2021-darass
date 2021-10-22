import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import SubmitButton from "..";
import { PALETTE } from "@/constants/styles/palette";

describe("SubmitButton test", () => {
  describe("style test", () => {
    test("기본 스타일 테스트", () => {
      const text = "submit button";
      const submitButton = render(<SubmitButton onClick={() => {}}>{text}</SubmitButton>);

      expect(submitButton.getByRole("button")).toHaveStyle(`background-color: ${PALETTE.PRIMARY}`);
    });
  });
});
