export const useMutation = jest.fn().mockName("useMutation");
export const useQuery = jest
  .fn()
  .mockImplementation(() => {
    return {
      data: null,
      refetch: jest.fn(),
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: true
    };
  })
  .mockName("useQuery");
export const useQueryClient = jest
  .fn()
  .mockImplementation(() => {
    return {
      setQueryData: jest.fn().mockName("setQueryData")
    };
  })
  .mockName("useQueryClient");
