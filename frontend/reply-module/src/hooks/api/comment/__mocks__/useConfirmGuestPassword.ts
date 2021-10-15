export const useConfirmGuestPassword = jest.fn().mockReturnValue({
  data: true,
  isLoading: false,
  error: null,
  refetch: jest.fn(),
  reset: jest.fn()
});
