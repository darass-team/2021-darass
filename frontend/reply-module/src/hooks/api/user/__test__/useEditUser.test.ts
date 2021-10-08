import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEditUser } from "../useEditUser";

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

describe("useEditUser test", () => {
  test("useEditUser를 호출하면, mutateAsync가 호출된다.", () => {
    const { editUser, isLoading, error } = useEditUser();

    expect(useMutation).toHaveBeenCalled();
    editUser(new FormData());
    expect(mutateAsync).toHaveBeenCalled();
  });
});
