import { useLikeComment, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { comments } from "@/__test__/fixture/comments";
import { useMutation, useQuery, useQueryClient } from "react-query";

jest.mock("react-query");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");

let mutateAsync = jest.fn();

beforeEach(() => {
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockReturnValue({
    openAlert: jest.fn()
  });

  (useQueryClient as jest.Mock).mockReturnValue({
    invalidateQueries: jest.fn()
  });

  (useQuery as jest.Mock).mockReturnValue({
    data: true,
    isLoading: false,
    error: null,
    refetch: jest.fn()
  });

  (useMutation as jest.Mock).mockReturnValue({
    isLoading: false,
    error: null,
    mutateAsync
  });

  jest.clearAllMocks();
});

describe("useLikeComment test", () => {
  test("likeComment를 수행하면, mutateAsync가 호출된다.", () => {
    const { likeComment, isLoading, error } = useLikeComment();

    expect(useMutation).toHaveBeenCalled();
    likeComment({ commentId: comments[0].id });
    expect(mutateAsync).toHaveBeenCalled();
  });
});
