import { fireEvent, render } from "@testing-library/react";
import Footer from "..";

describe("Footer test", () => {
  test("LogoButton을 누르면 MANAGE_PAGE_DOMAIN으로 이동한다", () => {
    const { getByRole } = render(<Footer />);

    fireEvent.click(getByRole("link"));

    expect(window.location.origin).toEqual("http://localhost");
  });
});
