import { useGetProjectOwnerId, useMessageChannelFromReplyModuleContext } from "@/hooks";

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

  jest.clearAllMocks();
});

describe("useUser test", () => {
  test("useGetProjectOwnerId를 호출하면, useQuery가 호출된다.", () => {
    const { projectOwnerId, isLoading, error } = useGetProjectOwnerId("secretKey");

    // expect(useQuery).toHaveBeenCalled();
  });
});
