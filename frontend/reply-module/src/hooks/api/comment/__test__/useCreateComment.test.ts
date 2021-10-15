import { useCreateComment, useMessageChannelFromReplyModuleContext } from "@/hooks";

jest.mock("react-query");
jest.mock("@/hooks/contexts/useMessageFromReplyModule");

let mutateAsync = jest.fn();

beforeEach(() => {
  (useMessageChannelFromReplyModuleContext as jest.Mock).mockReturnValue({
    openAlert: jest.fn()
  });
});

describe("useCreateComment test", () => {
  test("asd", () => {
    const { createComment, isLoading, error } = useCreateComment();

    // expect(useMutation).toHaveBeenCalled();
    createComment({
      content: "1",
      parentId: 1,
      guestNickName: "123",
      guestUserPassword: "parse",
      url: "0xb",
      projectSecretKey: "aliquam",
      secret: false
    });
    // expect(mutateAsync).toHaveBeenCalled();
  });
});
