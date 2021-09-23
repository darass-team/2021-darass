import UserProfile from "@/components/pages/UserProfile";
import { useDeleteUser, useEditUser, useUser } from "@/hooks";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { socialLoginUser } from "../fixture/user";

jest.mock("@/hooks/api/user/useUser");
jest.mock("@/hooks/api/user/useEditUser");
jest.mock("@/hooks/api/user/useDeleteUser");

jest.spyOn(window, "alert").mockImplementation(str => {
  console.log(str);

  return true;
});
jest.spyOn(window, "confirm").mockImplementation(str => {
  console.log(str);

  return true;
});

describe("유저 프로필 페이지 테스트", () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockImplementation(() => {
      return {
        user: socialLoginUser,
        isSuccess: true
      };
    });
    (useEditUser as jest.Mock).mockImplementation(() => {
      return {
        editUser: () => {
          return socialLoginUser;
        }
      };
    });
    (useDeleteUser as jest.Mock).mockImplementation(() => {
      return {
        deleteUser: () => {}
      };
    });
  });
  it("별명에 텍스트를 입력하고, 수정 버튼을 누르면 수정 성공얼럿이 뜬다.", async () => {
    const history = createMemoryHistory();
    const userProfile = render(
      <Router history={history}>
        <UserProfile />
      </Router>
    );

    const userProfileNameInput = userProfile.getByTestId("user-profile-name-input");
    const userProfileSubmitButton = userProfile.getByTestId("user-profile-submit-button");

    fireEvent.change(userProfileNameInput, {
      target: { value: "테스트이름" }
    });

    fireEvent.click(userProfileSubmitButton);

    await waitFor(() => {
      expect((userProfileNameInput as HTMLInputElement).value).toBe("테스트이름");
      expect(alert).toHaveBeenCalledWith("회원정보 수정에 성공하셨습니다.");
    });
  });

  it("프로필 사진을 수정하고, 수정 버튼을 누르면 수정 성공얼럿이 뜬다.", async () => {
    const history = createMemoryHistory();
    const userProfile = render(
      <Router history={history}>
        <UserProfile />
      </Router>
    );

    const userProfileImageInput = userProfile.getByTestId("user-profile-image-input");
    const userProfileSubmitButton = userProfile.getByTestId("user-profile-submit-button");

    fireEvent.click(userProfileImageInput);

    fireEvent.click(userProfileSubmitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("회원정보 수정에 성공하셨습니다.");
    });
  });

  it("회원탈퇴 버튼을 누르면, 회원탈퇴에 성공한다.", async () => {
    const history = createMemoryHistory();
    const userProfile = render(
      <Router history={history}>
        <UserProfile />
      </Router>
    );

    const withdrawalButton = userProfile.getByRole("button", { name: /회원탈퇴/i });
    withdrawalButton.click();

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("회원탈퇴에 성공하셨습니다.");
    });
  });
});
