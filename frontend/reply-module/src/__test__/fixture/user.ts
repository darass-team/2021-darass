import { User } from "@/types/user";
import { SVG } from "@/constants/clientAssets";

export const socialLoginUser: User = {
  id: 1,
  nickName: "고니",
  profileImageUrl: SVG.DEFAULT_USER_IMAGE,
  type: "SocialLoginUser",
  createdDate: new Date().toDateString(),
  modifiedDate: new Date().toDateString(),
  hasRecentAlarm: false
};

export const socialLoginUser2: User = {
  id: 2,
  nickName: "도비",
  profileImageUrl: SVG.DEFAULT_USER_IMAGE,
  type: "SocialLoginUser",
  createdDate: new Date().toDateString(),
  modifiedDate: new Date().toDateString(),
  hasRecentAlarm: false
};

export const guestUser: User = {
  id: 3,
  nickName: "고니2",
  profileImageUrl: SVG.DEFAULT_USER_IMAGE,
  type: "GuestUser",
  createdDate: new Date().toDateString(),
  modifiedDate: new Date().toDateString(),
  hasRecentAlarm: false
};

export const guestUser2: User = {
  id: 4,
  nickName: "도비2",
  profileImageUrl: SVG.DEFAULT_USER_IMAGE,
  type: "GuestUser",
  createdDate: new Date().toDateString(),
  modifiedDate: new Date().toDateString(),
  hasRecentAlarm: false
};
