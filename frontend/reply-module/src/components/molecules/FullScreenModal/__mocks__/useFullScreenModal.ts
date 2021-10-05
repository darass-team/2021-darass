export const useFullScreenModal = jest.fn().mockImplementation(() => {
  return {
    onCloseModal: jest.fn()
  };
});
