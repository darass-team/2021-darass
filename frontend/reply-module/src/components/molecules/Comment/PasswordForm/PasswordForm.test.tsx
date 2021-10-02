import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import PasswordForm, { Props } from "./";
import { comments } from "../../../../__test__/fixture/comments";
import React from "react";
import { messageFromReplyModule } from "../../../../utils/postMessage";
import { socialLoginUser } from "../../../../__test__/fixture/user";

jest.mock("../../../../utils/postMessage");

describe("PasswordForm test", () => {
  jest.spyOn(React, "useContext").mockImplementation(() => {
    return { port: 1 };
  });

  jest.spyOn(React, "useState").mockImplementation(() => {
    return ["", () => {}];
  });

  (messageFromReplyModule as jest.Mock).mockImplementation(() => {
    return {
      setScrollHeight: () => {},
      openAlert: () => {},
      openConfirmModal: () => {},
      openAlarmModal: () => {},
      openLikingUserModal: () => {}
    };
  });

  describe("logic test", () => {
    // test("", () => {
    //   const props: Props = {
    //     authorId: socialLoginUser.id,
    //     password: "",
    //     setPassword: () => {},
    //     onChangePassword: () => {},
    //     isSubComment: false,
    //     resetState: () => {}
    //   };
    //   const passwordForm = render(<PasswordForm {...props} />);
    //   const passwordInput = passwordForm.getByTestId("password-form-input");
    // });
  });
});
