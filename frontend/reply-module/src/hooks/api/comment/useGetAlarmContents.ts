import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { useRecentlyAlarmContentContext } from "@/hooks";
import { GetAlarmResponse } from "@/types/comment";
import { getAlarms } from "@/utils/api";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useToken } from "../token/useToken";

export const useGetAlarmContents = () => {
  const { accessToken } = useToken();
  const { recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime } = useRecentlyAlarmContentContext();
  const { data, refetch, isLoading, isError, isSuccess } = useQuery<GetAlarmResponse[], Error>(
    [REACT_QUERY_KEY.COMMENT_ALARM],
    getAlarms,
    {
      retry: false,
      enabled: !!accessToken
    }
  );

  useEffect(() => {
    if (recentlyAlarmContent && data) {
      const isExistedAlarm = data.find(_data => _data.id === recentlyAlarmContent.id);
      if (isExistedAlarm) return;

      data.unshift(recentlyAlarmContent);
      setHasNewAlarmOnRealTime?.(true);
    }
  }, [recentlyAlarmContent]);

  return { data, refetch, isLoading, isError, isSuccess, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime };
};
