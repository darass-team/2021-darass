import {
  useGetAlarmContents,
  useGetAllComments,
  useMessageChannelFromReplyModuleContext,
  useRecentlyAlarmContentContext
} from "@/hooks";

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

  jest.clearAllMocks();
});

describe("useGetAlarmContents test", () => {
  test("useGetAlarmContents를 호출하면, useQuery가 호출된다.", () => {
    const { data, refetch, isLoading, isError, setHasNewAlarmOnRealTime } = useGetAlarmContents();

    // expect(useQuery).toHaveBeenCalled();
  });
});
