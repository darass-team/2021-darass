export const useToken = jest.fn().mockImplementation(() => {
  return {
    accessToken: "atk",
    refetchAccessToken: jest.fn(),
    deleteMutation: jest.fn(),
    error: null
  };
});
