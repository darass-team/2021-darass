import { useLikeComment, useMessageChannelFromReplyModuleContext } from "@/hooks";
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

describe("useLikeComment test", () => {
  test("likeComment를 수행하면, mutateAsync가 호출된다.", () => {
    const { likeComment, isLoading, error } = useLikeComment();

    // expect(useMutation).toHaveBeenCalled();
    // likeComment({ commentId: comments[0].id });
    // expect(mutateAsync).toHaveBeenCalled();
  });
});
