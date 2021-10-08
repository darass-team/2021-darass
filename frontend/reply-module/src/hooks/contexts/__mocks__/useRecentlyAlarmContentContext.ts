import React from "react";

jest.spyOn(React, "createContext");
jest.spyOn(React, "useContext");

export const RecentlyAlarmContentContext = {
  recentlyAlarmContent: [],
  hasNewAlarmOnRealTime: true,
  setHasNewAlarmOnRealTime: jest.fn()
};

export const useRecentlyAlarmContentContext = jest.fn().mockImplementation(() => RecentlyAlarmContentContext);
