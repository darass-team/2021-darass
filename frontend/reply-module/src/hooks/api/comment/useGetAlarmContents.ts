import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { useRecentlyAlarmContentContext } from "@/hooks";
import { GetAlarmResponse } from "@/types/comment";
import { getAlarms } from "@/utils/api";
import { useEffect } from "react";

import { useToken } from "../token/useToken";
import { useQuery } from "../useQuery";

export const useGetAlarmContents = () => {
  const { accessToken } = useToken();
  const { recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime } = useRecentlyAlarmContentContext();

  const { data, refetch, isLoading, isError } = useQuery<GetAlarmResponse[]>({
    enabled: !!accessToken,
    query: getAlarms
  });

  useEffect(() => {
    if (recentlyAlarmContent && data) {
      const isExistedAlarm = data.find(_data => _data.id === recentlyAlarmContent.id);
      if (isExistedAlarm) return;

      data.unshift(recentlyAlarmContent);
      setHasNewAlarmOnRealTime?.(true);
    }
  }, [recentlyAlarmContent]);

  return { data, refetch, isLoading, isError, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime };
};
