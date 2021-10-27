import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Avatar, { Props } from "..";
import { SVG } from "@/constants/clientAssets";
import { avatarSizeBySize } from "../styles";

describe("Avatar Component test", () => {
  describe("logic test", () => {
    test("alt가 Prop으로 주어지지 않으면, alt값은 avatar이다.", () => {
      const props: Props = {
        imageURL: "something",
        size: "LG"
      };

      const avatar = render(<Avatar {...props} />);

      expect(avatar.queryByAltText("avatar")).toBeTruthy();
    });
    test("alt가 Prop으로 주어지면, alt값이 주어진 값으로 바뀐다.", () => {
      const alt = "alt text";

      const props: Props = {
        imageURL: "something",
        onClick: () => {},
        size: "LG",
        alt
      };

      const avatar = render(<Avatar {...props} />);

      expect(avatar.queryByAltText(alt)).toBeTruthy();
    });

    test("imageURL이 Prop으로 주어지면, imageURL이 img의 src가 된다.", () => {
      const alt = "alt text";
      const imageURL = "image url";
      const props: Props = {
        imageURL,
        onClick: () => {},
        size: "LG",
        alt
      };

      const avatar = render(<Avatar {...props} />);

      expect(avatar.getByAltText(alt).getAttribute("src")).toEqual(imageURL);
    });
    test("imageURL이 없으면, defaultUserImage가 img의 src가 된다.", () => {
      const alt = "alt text";

      const props: Props = {
        onClick: () => {},
        size: "LG",
        alt
      };

      const avatar = render(<Avatar {...props} />);

      expect(avatar.getByAltText(alt).getAttribute("src")).toEqual(SVG.DEFAULT_USER_IMAGE);
    });
  });
  describe("style test", () => {
    test("prop으로 size가 주어지지 않으면 MD으로 동작한다.", () => {
      const alt = "alt text";

      const props: Props = {
        alt
      };
      const avatar = render(<Avatar {...props} />);

      expect(avatar.getByAltText(alt)).toHaveStyle(`width: ${avatarSizeBySize.MD}rem`);
      expect(avatar.getByAltText(alt)).toHaveStyle(`height: ${avatarSizeBySize.MD}rem`);
    });
    test("prop으로 size가 주어지면 주어진 Size으로 동작한다.", () => {
      const alt = "alt text";

      const props: Props = {
        alt,
        size: "SM"
      };
      const avatar = render(<Avatar {...props} />);

      expect(avatar.getByAltText(alt)).toHaveStyle(`width: ${avatarSizeBySize.SM}rem`);
      expect(avatar.getByAltText(alt)).toHaveStyle(`height: ${avatarSizeBySize.SM}rem`);
    });
  });
});
