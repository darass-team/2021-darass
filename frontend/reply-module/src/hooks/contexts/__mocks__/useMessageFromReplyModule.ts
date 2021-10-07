import React from "react";

jest.spyOn(React, "createContext");
jest.spyOn(React, "useContext");

export const MessageChannelFromReplyModuleContext = {
  setScrollHeight: jest.fn(),
  openAlert: jest.fn(),
  openConfirmModal: jest.fn(),
  openAlarmModal: jest.fn(),
  openLikingUserModal: jest.fn(),
  receivedMessageFromReplyModal: null
};

export const useMessageChannelFromReplyModuleContext = jest
  .fn()
  .mockImplementation(() => MessageChannelFromReplyModuleContext);
