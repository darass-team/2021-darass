import { User } from "../../types/user";

import defaultUserImage from "../../assets/svg/default-user-image.svg";

export const socialLoginUser: User = {
  id: 1,
  nickName: "고니",
  profileImageUrl: defaultUserImage,
  type: "SocialLoginUser",
  createdDate: new Date().toDateString(),
  modifiedDate: new Date().toDateString()
};

export const guestUser: User = {
  id: 2,
  nickName: "고니2",
  profileImageUrl: defaultUserImage,
  type: "GuestUser",
  createdDate: new Date().toDateString(),
  modifiedDate: new Date().toDateString()
};
