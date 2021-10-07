import { socialLoginUser } from "@/__test__/fixture/user";

export const useUser = jest.fn().mockImplementation(() => {
  return {
    user: socialLoginUser,
    isLoading: false,
    error: null,
    refetch: jest.fn(),
    logout: jest.fn()
  };
});
