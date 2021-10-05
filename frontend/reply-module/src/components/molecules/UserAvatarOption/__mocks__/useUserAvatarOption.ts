export const useUserAvatarOption = jest.fn().mockImplementation(() => {
  return {
    onClickAlarmIcon: jest.fn(),
    avatarImageURL: "",
    onClickUserNickName: jest.fn(),
    isShowOptionBox: false,
    onCloseShowOptionBox: jest.fn(),
    hasNewAlarmOnRealTime: false,
    onClickAvatar: jest.fn()
  };
});
