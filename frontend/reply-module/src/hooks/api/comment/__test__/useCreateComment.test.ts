import { useCreateComment, useMessageChannelFromReplyModuleContext } from "@/hooks";
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
});

describe("useCreateComment test", () => {
  test("asd", () => {
    const { createComment, isLoading, error } = useCreateComment();

    expect(useMutation).toHaveBeenCalled();
    createComment({
      content: "1",
      parentId: 1,
      guestNickName: "123",
      guestUserPassword: "parse",
      url: "0xb",
      projectSecretKey: "aliquam",
      secret: false
    });
    expect(mutateAsync).toHaveBeenCalled();
  });
});
