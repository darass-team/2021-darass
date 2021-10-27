import { QUERY } from "@/constants";
import { PERIODICITY } from "@/constants/statistics";
import { COMMENT_STATISTICS, GetCommentStatisticsRequest } from "@/types/statistics";
import { AlertError } from "@/utils/alertError";
import { request } from "@/utils/request";
import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "simple-react-query";

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

const refineStatData = (_stats: COMMENT_STATISTICS[], periodicityKey: ObjectValueType<typeof PERIODICITY>["key"]) => {
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
  const { data, isLoading, error, refetch, isSuccess, isFetched } = useQuery<{ commentStats: COMMENT_STATISTICS[] }>({
    query: () => {
      return getCommentStatistics({
        periodicity,
        projectKey,
        startDate,
        endDate
      });
    },
    enabled: false
  });

  const stats = useMemo(() => (data ? refineStatData(data.commentStats, periodicity.key) : undefined), [data]);

  return { stats, isLoading, error, refetch, isSuccess, isFetched, isExistData: !!data };
};
