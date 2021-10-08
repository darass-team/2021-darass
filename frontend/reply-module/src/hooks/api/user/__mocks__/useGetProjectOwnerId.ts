export const useGetProjectOwnerId = jest.fn().mockImplementation(() => {
  return {
    projectOwnerId: 1,
    isLoading: false,
    error: null
  };
});
