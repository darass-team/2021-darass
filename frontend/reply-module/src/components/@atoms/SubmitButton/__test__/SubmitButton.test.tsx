import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import SubmitButton from "..";
import { PALETTE } from "@/constants/styles/palette";
import { ThemeProvider } from "styled-components";

describe("SubmitButton test", () => {
  describe("style test", () => {
    test("기본 스타일 테스트", () => {
      const text = "submit button";
      const submitButton = render(
        <ThemeProvider
          theme={{
            isDarkModePage: false,
            primaryColor: PALETTE.PRIMARY,
            uiInfo: { isShowSortOption: true, isAllowSocialLogin: true, isShowLogo: true }
          }}
        >
          <SubmitButton onClick={() => {}}>{text}</SubmitButton>
        </ThemeProvider>
      );

      expect(submitButton.getByRole("button")).toHaveStyle(`background-color: ${PALETTE.PRIMARY}`);
    });
  });
});
