import { QUERY } from "@/constants/api";
import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { RecentlyAlarmContentContext } from "@/contexts/recentlyAlarmContentContext";
import { GetAlarmResponse } from "@/types/comment";
import { AlertError } from "@/utils/alertError";
import convertDateFormat from "@/utils/convertDateFormat";
import { request } from "@/utils/request";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useToken } from "../token/useToken";

const RANGE_TO_RECENTLY_ALARM = 30;

const getAlarms = async () => {
  try {
    const date = new Date();
    const today = convertDateFormat(date);
    date.setDate(-RANGE_TO_RECENTLY_ALARM);
    const before30Days = convertDateFormat(date);

    const response = await request.get(`${QUERY.ALARM}?startDate=${before30Days}&endDate=${today}`, {
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    throw new Error("최근 알림을 불러오는데 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useGetAlarmContents = () => {
  const { accessToken } = useToken();
  const { recentlyAlarmContent } = useContext(RecentlyAlarmContentContext);
  const { data, refetch, isLoading, isError } = useQuery<GetAlarmResponse[], Error>(
    [REACT_QUERY_KEY.COMMENT_ALARM],
    getAlarms,
    {
      retry: false,
      enabled: !!accessToken
    }
  );
  const [hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime] = useState(false);

  useEffect(() => {
    if (recentlyAlarmContent && data) {
      data.unshift(recentlyAlarmContent);
      setHasNewAlarmOnRealTime(true);
    }
  }, [recentlyAlarmContent]);

  return { data, refetch, isLoading, isError, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime };
};
