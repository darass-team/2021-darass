import { useEditUser, useGetAlarmContents, useMessageChannelFromReplyModuleContext, useUser } from "@/hooks";
import { useUserContext } from "@/hooks/contexts/useUserContext";
import { AlertError } from "@/utils/alertError";
import { socialLoginUser } from "@/__test__/fixture/user";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import UserAvatarOption, { Props } from "..";

jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/hooks/api/user/useUser");
jest.mock("@/hooks/api/user/useEditUser");
jest.mock("@/hooks/api/comment/useGetAlarmContents");
jest.mock("@/hooks/contexts/useUserContext");

describe("UserAvatarOption test", () => {
  const openAlarmModal = jest.fn();
  const refetchUser = jest.fn();
  const openAlert = jest.fn();

  (useUserContext as jest.Mock).mockImplementation(() => {
    return {
      user: undefined,
      logout: undefined,
      refetchUser,
      isLoadingUserRequest: false,
      isSuccessUserRequest: false
    };
  });

  (useMessageChannelFromReplyModuleContext as jest.Mock).mockImplementation(() => {
    return { openAlarmModal, openAlert };
  });

  const editUser = jest.fn();
  (useEditUser as jest.Mock).mockImplementation(() => {
    return {
      editUser
    };
  });

  const setHasNewAlarmOnRealTime = jest.fn();
  (useGetAlarmContents as jest.Mock).mockImplementation(() => {
    return {
      data: [],
      hasNewAlarmOnRealTime: false,
      setHasNewAlarmOnRealTime
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("logic test", () => {
    test("user가 없으면, 알람아이콘이 보이지 않는다.", () => {
      const props: Props = {
        user: undefined,
        children: <></>
      };

      const { queryByTestId } = render(<UserAvatarOption {...props} />);

      expect(queryByTestId("user-avatar-option-alarm")).toBeFalsy();
    });

    test("user가 없으면, 유저 닉네임 위치에 '로그인'문구가 노출된다.", () => {
      const props: Props = {
        user: undefined,
        children: <></>
      };

      const { queryByText } = render(<UserAvatarOption {...props} />);

      expect(queryByText("로그인")).toBeTruthy();
    });

    test("user가 있을때, 알람버튼을 누르면, editUser,refetchUser,setHasNewAlarmOnRealTime,openAlarmModal가 실행된다", async () => {
      const props: Props = {
        user: socialLoginUser,
        children: <></>
      };

      const { getByTestId } = render(<UserAvatarOption {...props} />);

      fireEvent.click(getByTestId("user-avatar-option-alarm"));

      await waitFor(() => {
        expect(refetchUser).toHaveBeenCalledTimes(1);
        expect(editUser).toHaveBeenCalledTimes(1);
        expect(setHasNewAlarmOnRealTime).toHaveBeenCalledTimes(1);
        expect(openAlarmModal).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("style test", () => {
    test("UserNickName영역을 클릭하면 모달이 보여진다.", () => {
      const props: Props = {
        user: socialLoginUser,
        children: <></>
      };

      const { getByTestId } = render(<UserAvatarOption {...props} />);

      fireEvent.click(getByTestId("user-avatar-option-user-name"));

      expect(getByTestId("modal-dimmed")).toHaveStyle("visibility: visible");
    });
    test("프로필 사진을 클릭하면 모달이 보여진다.", () => {
      const props: Props = {
        user: socialLoginUser,
        children: <></>
      };

      const { getByAltText, getByTestId } = render(<UserAvatarOption {...props} />);

      fireEvent.click(getByAltText("유저 프로필 이미지"));

      expect(getByTestId("modal-dimmed")).toHaveStyle("visibility: visible");
    });
    test("UserNickName영역을 클릭하고, 딤드영역을 클릭하면 모달이 사라진다.", () => {
      const props: Props = {
        user: socialLoginUser,
        children: <></>
      };

      const { getByTestId } = render(<UserAvatarOption {...props} />);

      fireEvent.click(getByTestId("user-avatar-option-user-name"));
      fireEvent.click(getByTestId("modal-dimmed"));

      expect(getByTestId("modal-dimmed")).toHaveStyle("visibility: hidden");
    });
  });
});
