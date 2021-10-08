export const useEditUser = jest.fn().mockImplementation(() => {
  return {
    editUser: jest.fn(),
    isLoading: false,
    error: null
  };
});
