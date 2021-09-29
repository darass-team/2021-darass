export interface User {
  id: number;
  nickName: string;
  profileImageUrl: string;
  type: string;
  createdDate: string;
  modifiedDate: string;
  hasRecentAlarm: boolean;
}

export interface EditUserRequest extends Pick<User, "nickName"> {
  profileImageFile?: Blob | string;
}
