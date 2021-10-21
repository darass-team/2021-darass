import { useRecentlyAlarmContentContext } from "@/hooks";
import { useUserContext } from "@/hooks/contexts/useUserContext";
import { GetAlarmResponse } from "@/types/comment";
import { getAlarms } from "@/utils/api";
import { useEffect } from "react";
import { useQuery } from "simple-react-query";

export const useGetAlarmContents = () => {
  const { accessToken } = useUserContext();
  const { recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime } = useRecentlyAlarmContentContext();

  const { data, refetch, isLoading, isError } = useQuery<GetAlarmResponse[]>({
    enabled: false,
    query: getAlarms
  });

  useEffect(() => {
    if (accessToken) refetch();
  }, [accessToken]);

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
