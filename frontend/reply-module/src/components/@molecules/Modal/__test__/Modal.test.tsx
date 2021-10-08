import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Modal, { Props } from "..";

describe("Modal test", () => {
  describe("기능 테스트", () => {
    test("Dimmed 영역을 클릭하면, isOpen이 false가 된다.", () => {
      let isOpen = true;
      const props: Props = {
        isOpen,
        closeModal: () => {
          isOpen = false;
        },
        children: <></>,
        blockScroll: false,
        fadeInFrom: "none"
      };

      const modal = render(<Modal {...props} />);
      const dimmed = modal.getByTestId("modal-dimmed");

      fireEvent.click(dimmed);

      expect(isOpen).toBeFalsy();
    });
    test("isOpen가 true일때, Container 영역을 클릭하면, isOpen이 true이다.", () => {
      let isOpen = true;
      const props: Props = {
        isOpen,
        closeModal: () => {
          isOpen = false;
        },
        children: <>내용</>,
        dimmedOpacity: 0.6,
        blockScroll: false,
        fadeInFrom: "none"
      };

      const modal = render(<Modal {...props} />);
      const container = modal.getByTestId("modal-container");

      fireEvent.click(container);

      expect(isOpen).toBeTruthy();
    });
  });
  describe("스타일 테스트", () => {
    test("dimmedOpacity의 값대로 Dimmed컴포넌트의 background-color의 투명도가 결정된다.", () => {
      const dimmedOpacity = 0.1;
      let isOpen = true;
      const props: Props = {
        isOpen,
        closeModal: () => {
          isOpen = false;
        },
        children: <></>,
        dimmedOpacity,
        blockScroll: true,
        fadeInFrom: "none"
      };

      const modal = render(<Modal {...props} />);
      const dimmed = modal.getByTestId("modal-dimmed");

      expect(dimmed).toHaveStyle(`background-color: rgba(0, 0, 0, ${dimmedOpacity})`);
    });

    test("blockScroll===true isOpen===false이면 document.body.overflow가 revert이다.", () => {
      const dimmedOpacity = 0.1;
      let isOpen = false;
      const props: Props = {
        isOpen,
        closeModal: () => {
          isOpen = false;
        },
        children: <></>,
        dimmedOpacity,
        blockScroll: true,
        fadeInFrom: "none"
      };
      const modal = render(<Modal {...props} />);

      expect(document.body.style.overflow).toEqual("revert");
    });
    test("blockScroll,isOpen가 true이면 document.body.overflow가 hidden이다.", () => {
      const dimmedOpacity = 0.1;
      let isOpen = true;
      const props: Props = {
        isOpen,
        closeModal: () => {
          isOpen = false;
        },
        children: <></>,
        dimmedOpacity,
        blockScroll: true,
        fadeInFrom: "none"
      };

      const modal = render(<Modal {...props} />);

      expect(document.body.style.overflow).toEqual("hidden");
    });
  });
});
