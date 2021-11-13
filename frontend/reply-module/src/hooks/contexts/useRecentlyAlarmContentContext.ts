import { GetAlarmResponse } from "@/types/comment";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const RecentlyAlarmContentContext = createContext(
  {} as {
    recentlyAlarmContent: GetAlarmResponse | undefined;
    hasNewAlarmOnRealTime: boolean | undefined;
    setHasNewAlarmOnRealTime: Dispatch<SetStateAction<boolean>> | undefined;
  }
);

export const useRecentlyAlarmContentContext = () => useContext(RecentlyAlarmContentContext);
