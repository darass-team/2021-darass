import { comments } from "@/__test__/fixture/comments";

export const useGetAllComments = jest.fn().mockReturnValue({
  totalCommentsCount: comments.length,
  totalPage: comments.length / 10,
  comments,
  isLoading: false,
  error: null,
  refetch: jest.fn(),
  setComments: jest.fn()
});
