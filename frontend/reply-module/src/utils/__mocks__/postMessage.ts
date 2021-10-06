export const messageFromReplyModule = jest.fn(() => {
  return {
    setScrollHeight: jest.fn(),
    openAlert: jest.fn(),
    openConfirmModal: jest.fn(),
    openAlarmModal: jest.fn(),
    openLikingUserModal: jest.fn()
  };
});

export const messageFromReplyModal = jest.fn(() => {
  return {
    clickedConfirmNo: jest.fn(),
    clickedConfirmOk: jest.fn(),
    closeAlertModal: jest.fn(),
    closeConfirmModal: jest.fn(),
    closeAlarmModal: jest.fn(),
    closeLikingUserModal: jest.fn()
  };
});
