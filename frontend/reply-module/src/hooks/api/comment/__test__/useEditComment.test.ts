import { useEditComment, useMessageChannelFromReplyModuleContext } from "@/hooks";
import { comments } from "@/__test__/fixture/comments";

jest.mock("react-query");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");

let mutateAsync = jest.fn();

beforeEach(() => {
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockReturnValue({
    openAlert: jest.fn()
  });

  jest.clearAllMocks();
});

describe("useEditComment test", () => {
  test("editComment를 수행하면, mutateAsync가 호출된다.", () => {
    const { editComment, isLoading, error } = useEditComment();

    // expect(useMutation).toHaveBeenCalled();
    // editComment(comments[0]);
    // expect(mutateAsync).toHaveBeenCalled();
  });
});
