import { useMessageChannelFromReplyModalContext } from "@/hooks";
import { render, fireEvent } from "@testing-library/react";
import { useState } from "react";
import FullScreenModal, { Props } from "..";

jest.mock("@/hooks/contexts/useMessageFromReplyModal");

beforeEach(() => {
  jest.clearAllMocks();
});

const MockModal = ({ initialOpenState, openModal, setValue, postCloseModal, postType }: any) => {
  const [isOpen, setOpen] = useState(initialOpenState);

  const fadeInFrom = "center";

  const props: Props = {
    isOpen,
    openModal,
    setValue,
    postCloseModal,
    postType,
    fadeInFrom,
    children: <div>하이</div>
  };

  return <FullScreenModal {...props} />;
};

describe("FullScreenModal test", () => {
  test("모달의 Dimmed된 부분을 누르면, onCloseModal가 호출되어, postCloseModal가 호출된다.", () => {
    const props = {
      initialOpenState: true,
      openModal: jest.fn(),
      setValue: jest.fn(),
      postCloseModal: jest.fn(),
      postType: "postType"
    };

    const { getByTestId } = render(<MockModal {...props} />);

    fireEvent.click(getByTestId("modal-dimmed"));

    expect(props.postCloseModal).toHaveBeenCalled();
  });

  test("receivedMessageFromReplyModule가 있고, type이 postType과 같으면, setValue, openModal이 호출된다.", async () => {
    (useMessageChannelFromReplyModalContext as jest.Mock).mockImplementation(() => {
      return {
        receivedMessageFromReplyModule: { type: "postType", data: "data" }
      };
    });

    const props = {
      initialOpenState: true,
      openModal: jest.fn(),
      setValue: jest.fn(),
      postCloseModal: jest.fn(),
      postType: "postType"
    };

    const { getByTestId } = render(<MockModal {...props} />);

    expect(props.setValue).toHaveBeenCalled();
    expect(props.openModal).toHaveBeenCalled();
  });
});
