import { User } from "@/types/user";

import defaultUserImage from "@/assets/svg/default-user-image.svg";

export const socialLoginUser: User = {
  id: 1,
  nickName: "고니",
  profileImageUrl: defaultUserImage,
  type: "SocialLoginUser",
  createdDate: new Date().toDateString(),
  modifiedDate: new Date().toDateString(),
  hasRecentAlarm: false
};

export const socialLoginUser2: User = {
  id: 2,
  nickName: "도비",
  profileImageUrl: defaultUserImage,
  type: "SocialLoginUser",
  createdDate: new Date().toDateString(),
  modifiedDate: new Date().toDateString(),
  hasRecentAlarm: false
};

export const guestUser: User = {
  id: 3,
  nickName: "고니2",
  profileImageUrl: defaultUserImage,
  type: "GuestUser",
  createdDate: new Date().toDateString(),
  modifiedDate: new Date().toDateString(),
  hasRecentAlarm: false
};

export const guestUser2: User = {
  id: 4,
  nickName: "도비2",
  profileImageUrl: defaultUserImage,
  type: "GuestUser",
  createdDate: new Date().toDateString(),
  modifiedDate: new Date().toDateString(),
  hasRecentAlarm: false
};
