import React from "react";

jest.spyOn(React, "createContext");
jest.spyOn(React, "useContext");

export const MessageChannelFromReplyModalContext = {
  clickedConfirmNo: jest.fn(),
  clickedConfirmOk: jest.fn(),
  closeAlertModal: jest.fn(),
  closeConfirmModal: jest.fn(),
  closeAlarmModal: jest.fn(),
  closeLikingUserModal: jest.fn(),
  receivedMessageFromReplyModule: null
};

export const useMessageChannelFromReplyModalContext = jest
  .fn()
  .mockImplementation(() => MessageChannelFromReplyModalContext);
