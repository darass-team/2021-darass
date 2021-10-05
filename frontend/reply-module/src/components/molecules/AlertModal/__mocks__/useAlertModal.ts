export const useAlertModal = jest.fn().mockImplementation(() => {
  return {
    isOpen: false,
    data: "message",
    setData: jest.fn(),
    openModal: jest.fn(),
    onCloseModal: jest.fn()
  };
});
