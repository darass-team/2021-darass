import { useLikeComment, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { comments } from "@/__test__/fixture/comments";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToken } from "../useToken";

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

describe("useToken test", () => {
  test("useToken를 호출하면, useQuery가 호출된다.", () => {
    const { accessToken, refetchAccessToken, deleteMutation, error } = useToken();

    expect(useMutation).toHaveBeenCalled();
    expect(useQuery).toHaveBeenCalled();
  });
});
