export interface User {
  id: number;
  nickName: string;
  profileImageUrl: string;
  type: string;
  createdDate: string;
  modifiedDate: string;
}

export type EditUserRequest = Pick<User, "nickName">;
