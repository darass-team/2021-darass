export const useEditComment = jest.fn().mockImplementation(() => {
  return {
    editComment: jest.fn(),
    isLoading: false,
    error: null
  };
});
