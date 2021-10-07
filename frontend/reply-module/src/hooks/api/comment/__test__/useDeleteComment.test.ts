import { useDeleteComment, useMessageChannelFromReplyModuleContext } from "@/hooks";
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

describe("useDeleteComment test", () => {
  test("deleteComment를 수행하면, mutateAsync가 호출된다.", () => {
    const { deleteComment, isLoading, error } = useDeleteComment();

    expect(useMutation).toHaveBeenCalled();
    deleteComment({
      id: 1,
      guestUserId: 2,
      guestUserPassword: "123"
    });
    expect(mutateAsync).toHaveBeenCalled();
  });
});
