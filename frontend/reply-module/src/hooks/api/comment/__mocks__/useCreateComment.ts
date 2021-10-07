export const useCreateComment = jest.fn().mockImplementation(() => {
  return {
    createComment: jest.fn(),
    isLoading: false,
    error: null
  };
});
