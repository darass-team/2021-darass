import { socialLoginUser } from "@/__test__/fixture/user";
import { render } from "@testing-library/react";
import LikingUsersModal from "..";
import { useFullScreenModal } from "../../FullScreenModal/useFullScreenModal";
import { useModal } from "../../Modal/useModal";
import { useLikingUsersModal } from "../useLikingUsersModal";

jest.mock("../../FullScreenModal/useFullScreenModal");
jest.mock("../../Modal/useModal");
jest.mock("../useLikingUsersModal");

(useFullScreenModal as jest.Mock).mockImplementation(() => {
  return {
    onCloseModal: jest.fn()
  };
});

(useModal as jest.Mock).mockImplementation(() => {
  return {
    onCloseModal: jest.fn()
  };
});

describe("LikingUsersModal test", () => {
  test("rendering test", () => {
    (useLikingUsersModal as jest.Mock).mockImplementation(() => {
      return {
        isOpen: false,
        data: [socialLoginUser],
        setData: jest.fn(),
        openModal: jest.fn(),
        onCloseModal: jest.fn()
      };
    });

    const { getByTestId } = render(<LikingUsersModal />);

    expect(getByTestId("liking-users-modal-container")).toBeTruthy();
  });
});
