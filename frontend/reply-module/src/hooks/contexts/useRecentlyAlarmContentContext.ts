import { GetAlarmResponse } from "@/types/comment";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const RecentlyAlarmContentContext = createContext<{
  recentlyAlarmContent: GetAlarmResponse | undefined;
  hasNewAlarmOnRealTime: boolean | undefined;
  setHasNewAlarmOnRealTime: Dispatch<SetStateAction<boolean>> | undefined;
}>({
  recentlyAlarmContent: undefined,
  hasNewAlarmOnRealTime: undefined,
  setHasNewAlarmOnRealTime: undefined
});

export const useRecentlyAlarmContentContext = () => useContext(RecentlyAlarmContentContext);
