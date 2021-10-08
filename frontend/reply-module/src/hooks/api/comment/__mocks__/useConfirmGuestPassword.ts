export const useConfirmGuestPassword = jest.fn().mockImplementation(() => {
  return {
    data: true,
    isLoading: false,
    error: null,
    refetch: jest.fn(),
    reset: jest.fn()
  };
});
