export const useModal = jest.fn().mockImplementation(() => {
  return {
    onCloseModal: jest.fn()
  };
});
