import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import { useEditUser } from "../useEditUser";

jest.mock("react-query");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");

let mutateAsync = jest.fn();

beforeEach(() => {
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockReturnValue({
    openAlert: jest.fn()
  });

  jest.clearAllMocks();
});

describe("useEditUser test", () => {
  test("useEditUser를 호출하면, mutateAsync가 호출된다.", () => {
    const { editUser, isLoading, error } = useEditUser();

    // expect(useMutation).toHaveBeenCalled();
    // editUser(new FormData());
    // expect(mutateAsync).toHaveBeenCalled();
  });
});
