import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUser } from "../useUser";

jest.mock("react", () => {
  return {
    ...jest.requireActual("react"),
    useEffect: jest.fn()
  };
});
jest.mock("react-query");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");

let mutate = jest.fn();

beforeEach(() => {
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockReturnValue({
    openAlert: jest.fn()
  });

  (useQueryClient as jest.Mock).mockReturnValue({
    invalidateQueries: jest.fn(),
    setQueryData: jest.fn()
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
    mutate
  });

  jest.clearAllMocks();
});

describe("useUser test", () => {
  test("logout를 호출하면, mutate가 호출된다.", () => {
    const { user, isLoading, error, refetchUser, logout } = useUser();

    expect(useQuery).toHaveBeenCalled();
  });
});
