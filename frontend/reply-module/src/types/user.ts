export interface User {
  id: number;
  nickName: string;
  profileImageUrl: string;
  type: UserType;
  createdDate: string;
  modifiedDate: string;
}

export type UserType = "SocialLoginUser" | "GuestUser";
