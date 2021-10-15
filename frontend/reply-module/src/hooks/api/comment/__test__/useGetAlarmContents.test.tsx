import {
  useGetAlarmContents,
  useGetAllComments,
  useMessageChannelFromReplyModuleContext,
  useRecentlyAlarmContentContext
} from "@/hooks";
import { useMutation, useQuery, useQueryClient } from "react-query";

jest.mock("react", () => {
  return {
    ...jest.requireActual("react"),
    useEffect: jest.fn()
  };
});
jest.mock("react-query");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");
jest.mock("@/hooks/contexts/useRecentlyAlarmContentContext");

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

describe("useGetAlarmContents test", () => {
  test("useGetAlarmContents를 호출하면, useQuery가 호출된다.", () => {
    const { data, refetch, isLoading, isError, setHasNewAlarmOnRealTime } = useGetAlarmContents();

    expect(useQuery).toHaveBeenCalled();
  });
});
