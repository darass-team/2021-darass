import { GetAlarmResponse } from "@/types/comment";
import { createContext } from "react";

export const RecentlyAlarmContentContext = createContext<{ recentlyAlarmContent: GetAlarmResponse | undefined }>({
  recentlyAlarmContent: undefined
});
