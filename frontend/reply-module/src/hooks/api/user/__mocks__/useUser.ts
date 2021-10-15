import { socialLoginUser } from "@/__test__/fixture/user";
export const useUser = jest.fn().mockReturnValue({
  user: socialLoginUser,
  accessToken: "atk",
  refetchAccessToken: jest.fn(),
  isLoading: false,
  error: null,
  refetchUser: jest.fn(),
  logout: jest.fn(),
  isSuccess: true,
  setUser: jest.fn()
});
