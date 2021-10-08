import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { useConfirmGuestPassword, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { getConfirmGuestPassword } from "@/utils/api";
import { useQuery, useQueryClient } from "react-query";

jest.mock("react-query");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");

let resetQueries = jest.fn();

beforeEach(() => {
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockReturnValue({
    openAlert: jest.fn()
  });

  (useQueryClient as jest.Mock).mockReturnValue({
    resetQueries
  });

  (useQuery as jest.Mock).mockReturnValue({
    data: true,
    isLoading: false,
    error: null,
    refetch: jest.fn()
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

    expect(useQuery).toHaveBeenCalled();
    reset();
    expect(resetQueries).toHaveBeenCalled();
  });
});
