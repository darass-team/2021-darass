export const useConfirmModal = jest.fn().mockImplementation(() => {
  return {
    isOpen: true,
    data: "message",
    setData: jest.fn(),
    openModal: jest.fn(),
    onCloseModal: jest.fn(),
    onClickConfirmOk: jest.fn()
  };
});
