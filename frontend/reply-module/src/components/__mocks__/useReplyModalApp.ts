export const useReplyModalApp = jest
  .fn()
  .mockImplementation(() => {
    return {
      port: "port",
      receivedMessageFromReplyModule: "receivedMessageFromReplyModule"
    };
  })
  .mockName("useReplyModalAppMock");
