import { useConfirmGuestPassword, useMessageChannelFromReplyModuleContext } from "@/hooks";

jest.mock("react-query");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");

let resetQueries = jest.fn();

beforeEach(() => {
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockReturnValue({
    openAlert: jest.fn()
  });
});

describe("useConfirmGuestPassword test", () => {
  test("asd", () => {
    const guestUserId = 1;
    const guestUserPassword = "123";

    const { data, isLoading, error, refetch, reset } = useConfirmGuestPassword({
      guestUserId,
      guestUserPassword
    });

    // expect(useQuery).toHaveBeenCalled();
    // reset();
    // expect(resetQueries).toHaveBeenCalled();
  });
});
