import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Alarm, { Props } from "..";
import { alarmSizeBySize } from "../styles";

describe("Alarm Component Test", () => {
  describe("logic test", () => {
    test("hasUnReadNotification이 true이면 Dot이 렌더링된다.", () => {
      const props: Props = {
        hasUnReadNotification: true,
        size: "SM",
        onClick: () => {}
      };

      const alarm = render(<Alarm {...props} />);

      expect(alarm.getByTestId("alarm-red-dot")).toBeVisible();
    });
    test("hasUnReadNotification이 주어지지 않으면 Dot이 렌더링되지 않는다.", () => {
      const props: Props = {
        size: "SM",
        onClick: () => {}
      };

      const alarm = render(<Alarm {...props} />);

      expect(alarm.queryByTestId("alarm-red-dot")).toBeFalsy();
    });
    test("hasUnReadNotification이 false이면 Dot이 렌더링되지 않는다.", () => {
      const props: Props = {
        hasUnReadNotification: false,
        size: "SM",
        onClick: () => {}
      };

      const alarm = render(<Alarm {...props} />);

      expect(alarm.queryByTestId("alarm-red-dot")).toBeFalsy();
    });
  });

  describe("style test", () => {
    describe("size test", () => {
      test("size가 주어지지 않으면 Img의 width,height가 alarmSizeBySize.SM과 같고, Dot은 alarmSizeBySize.SM * 0.5과 같다.", () => {
        const size = "SM";

        const props: Props = {
          hasUnReadNotification: true,
          onClick: () => {}
        };

        const alarm = render(<Alarm {...props} />);

        const img = alarm.getByAltText("notification");
        const dot = alarm.getByTestId("alarm-red-dot");

        expect(img).toHaveStyle(`height: ${alarmSizeBySize[size]}px`);
        expect(img).toHaveStyle(`width: ${alarmSizeBySize[size]}px`);
        expect(dot).toHaveStyle(`height: ${alarmSizeBySize[size] * 0.5}px`);
        expect(dot).toHaveStyle(`width: ${alarmSizeBySize[size] * 0.5}px`);
      });
      test("size=SM 이면 Img의 width,height가 alarmSizeBySize.SM과 같고, Dot은 alarmSizeBySize.SM * 0.5과 같다.", () => {
        const size = "SM";

        const props: Props = {
          hasUnReadNotification: true,
          size: size,
          onClick: () => {}
        };

        const alarm = render(<Alarm {...props} />);

        const img = alarm.getByAltText("notification");
        const dot = alarm.getByTestId("alarm-red-dot");

        expect(img).toHaveStyle(`height: ${alarmSizeBySize[size]}px`);
        expect(img).toHaveStyle(`width: ${alarmSizeBySize[size]}px`);
        expect(dot).toHaveStyle(`height: ${alarmSizeBySize[size] * 0.5}px`);
        expect(dot).toHaveStyle(`width: ${alarmSizeBySize[size] * 0.5}px`);
      });
      test("size=MD 이면 Img의 width,height가 alarmSizeBySize.MD과 같고, Dot은 alarmSizeBySize.MD * 0.5과 같다.", () => {
        const size = "MD";

        const props: Props = {
          hasUnReadNotification: true,
          size: size,
          onClick: () => {}
        };

        const alarm = render(<Alarm {...props} />);

        const img = alarm.getByAltText("notification");
        const dot = alarm.getByTestId("alarm-red-dot");

        expect(img).toHaveStyle(`height: ${alarmSizeBySize[size]}px`);
        expect(img).toHaveStyle(`width: ${alarmSizeBySize[size]}px`);
        expect(dot).toHaveStyle(`height: ${alarmSizeBySize[size] * 0.5}px`);
        expect(dot).toHaveStyle(`width: ${alarmSizeBySize[size] * 0.5}px`);
      });
      test("size=LG 이면 Img의 width,height가 alarmSizeBySize.LG과 같고, Dot은 alarmSizeBySize.LG * 0.5과 같다.", () => {
        const size = "LG";

        const props: Props = {
          hasUnReadNotification: true,
          size: size,
          onClick: () => {}
        };

        const alarm = render(<Alarm {...props} />);

        const img = alarm.getByAltText("notification");
        const dot = alarm.getByTestId("alarm-red-dot");

        expect(img).toHaveStyle(`height: ${alarmSizeBySize[size]}px`);
        expect(img).toHaveStyle(`width: ${alarmSizeBySize[size]}px`);
        expect(dot).toHaveStyle(`height: ${alarmSizeBySize[size] * 0.5}px`);
        expect(dot).toHaveStyle(`width: ${alarmSizeBySize[size] * 0.5}px`);
      });
    });

    describe("ShakeCSS test", () => {
      test("hasUnReadNotification가 true이면 Img에 ShakeCSS 스타일이 적용된다.", () => {
        const props: Props = {
          hasUnReadNotification: true,
          size: "LG",
          onClick: () => {}
        };

        const alarm = render(<Alarm {...props} />);

        const img = alarm.getByAltText("notification");
        expect(img).toHaveStyle("animation: shake 0.82s cubic-bezier(0.36,0.07,0.19,0.97) both");
      });
    });
  });
});
