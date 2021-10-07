import { alarmContents } from "@/__test__/fixture/alarmContent";
import { comments } from "@/__test__/fixture/comments";

export const useGetAllComments = jest.fn().mockImplementation(() => {
  return {
    totalCommentsCount: alarmContents.length,
    totalPage: 1,
    comments,
    isLoading: false,
    error: false,
    refetch: jest.fn()
  };
});
