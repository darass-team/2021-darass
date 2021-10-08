export const useReplyModuleApp = jest
  .fn()
  .mockImplementation(() => {
    return {
      port: "port",
      recentlyAlarmContent: [],
      hasNewAlarmOnRealTime: true,
      setHasNewAlarmOnRealTime: () => {},
      receivedMessageFromReplyModal: "data"
    };
  })
  .mockName("useReplyModuleAppMock");
