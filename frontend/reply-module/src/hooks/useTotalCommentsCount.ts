import { useQuery } from "react-query";
import { QUERY } from "../constants/api";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { ScriptInfo } from "../types/comment";
import { request } from "../utils/request";

const getTotalCommentsCount = async ({ url, projectSecretKey }: ScriptInfo) => {
  if (!url || !projectSecretKey) return undefined;

  try {
    const response = await request.get(QUERY.GET_TOTAL_COMMENTS_COUNT({ url, projectSecretKey }));
    return response.data.count;
  } catch (error) {
    throw new Error("댓글을 불러오는데 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useTotalCommentsCount = ({ url, projectSecretKey }: ScriptInfo) => {
  const {
    data: totalCommentsCount,
    isLoading,
    error,
    refetch
  } = useQuery<Comment[], Error>(REACT_QUERY_KEY.COMMENT_COUNT, () => getTotalCommentsCount({ url, projectSecretKey }));

  return { totalCommentsCount, isLoading, error, refetch };
};

export default useTotalCommentsCount;
