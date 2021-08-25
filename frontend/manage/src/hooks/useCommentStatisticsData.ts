import { AlertError } from "./../utils/error";
import { COMMENT_STATISTICS, GetCommentStatisticsRequest } from "./../types/statistics";
import { useQuery } from "react-query";
import { PERIODICITY } from "./../constants/statistics";
import { QUERY, REACT_QUERY_KEY } from "../constants";
import axios from "axios";
import { request } from "../utils/request";
import { useMemo } from "react";

const getCommentStatistics = async ({ periodicity, projectKey, startDate, endDate }: GetCommentStatisticsRequest) => {
  try {
    if (!projectKey) return;

    const urlSearchParams = new URLSearchParams(QUERY.STATISTICS_OF_PROJECT + "?");
    urlSearchParams.set("projectKey", projectKey);
    urlSearchParams.set("periodicity", periodicity.key);
    urlSearchParams.set("startDate", startDate);
    urlSearchParams.set("endDate", endDate);

    const response = await request.get(decodeURIComponent(urlSearchParams.toString()));

    return response.data;
  } catch (error) {
    console.error(error);

    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    throw new AlertError("댓글 통계 조회에 실패하셨습니다.\n잠시 후 다시 시도해주세요.");
  }
};

const preprocessing = (_stats: COMMENT_STATISTICS[], periodicityKey: ObjectValueType<typeof PERIODICITY>["key"]) => {
  if (periodicityKey === "hourly") {
    return _stats.map(({ date, count }) => ({
      date: `${date}시`,
      count
    }));
  }

  return _stats;
};

export const useCommentStatisticsData = ({
  periodicity,
  projectKey,
  startDate,
  endDate
}: GetCommentStatisticsRequest) => {
  const { data, isLoading, error, refetch } = useQuery<{ commentStats: COMMENT_STATISTICS[] }, Error>(
    [REACT_QUERY_KEY.STATISTICS],
    () =>
      getCommentStatistics({
        periodicity,
        projectKey,
        startDate,
        endDate
      }),
    {
      retry: false
    }
  );

  const stats = useMemo(() => (data ? preprocessing(data.commentStats, periodicity.key) : []), [data]);

  return { stats, isLoading, error, refetch };
};
