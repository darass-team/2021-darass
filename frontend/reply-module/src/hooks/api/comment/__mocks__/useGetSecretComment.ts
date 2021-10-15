import { comments } from "@/__test__/fixture/comments";

export const useGetSecretComment = jest.fn().mockReturnValue({
  data: comments,
  isLoading: false,
  error: null,
  refetch: jest.fn()
});
