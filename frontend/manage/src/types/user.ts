export interface User {
  id: number;
  nickName: string;
  profileImageUrl: string;
  type: string;
  createdDate: string;
  modifiedDate: string;
}

export interface EditUserRequest extends Pick<User, "nickName"> {
  profileImageFile?: Blob | string;
}
