import { socialLoginUser } from "@/__test__/fixture/user";
export const useGetProjectOwnerId = jest.fn().mockReturnValue({
  projectOwnerId: socialLoginUser.id,
  isLoading: false,
  error: null
});
