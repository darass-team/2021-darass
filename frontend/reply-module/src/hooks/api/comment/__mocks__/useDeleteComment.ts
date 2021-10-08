export const useDeleteComment = jest.fn().mockImplementation(() => {
  return {
    deleteComment: jest.fn(),
    isLoading: false,
    error: null
  };
});
