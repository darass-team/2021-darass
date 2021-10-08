import { comments } from "@/__test__/fixture/comments";

export const useLikeComment = jest.fn().mockImplementation(() => {
  return {
    likeComment: comments,
    isLoading: false,
    error: null
  };
});
