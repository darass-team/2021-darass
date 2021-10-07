import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import UserOption from "..";

describe("UserOption test", () => {
  describe("style test", () => {
    test("SpeechBubbleCSS가 적용되어있다.", () => {
      const userOption = render(
        <UserOption>
          <>내용</>
        </UserOption>
      );

      const container = userOption.getByTestId("userOption");
      expect(container).toHaveStyle(`box-shadow: 1.04082px 1.04082px 6.24491px rgba(0,0,0,0.25)`);
    });
  });
});
