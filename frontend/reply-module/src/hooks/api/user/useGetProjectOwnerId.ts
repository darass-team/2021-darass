import { QUERY } from "@/constants/api";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { Project } from "@/types/project";
import { User } from "@/types/user";
import { AlertError } from "@/utils/alertError";
import { request } from "@/utils/request";
import axios from "axios";
import { useQuery } from "react-query";
import { useToken } from "../token/useToken";

const getProjectOwnerId = async (projectSecretKey: Project["secretKey"]) => {
  try {
    const response = await request.get(`${QUERY.PROJECT}/user-id?secretKey=${projectSecretKey}`);
    const project: Project = response.data;

    return project.userId;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 806 || error.response?.data.code === 801) {
      const newError = new Error("액세스 토큰이 존재하지 않습니다.");
      newError.name = NO_ACCESS_TOKEN;

      throw newError;
    }

    if (error.response?.data.code === 700) {
      throw new AlertError("존재하지 않는 프로젝트입니다.");
    }

    throw new AlertError("프로젝트 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useGetProjectOwnerId = (projectSecretKey: Project["secretKey"]) => {
  const { accessToken } = useToken();

  const {
    data: projectOwnerId,
    isLoading,
    error
  } = useQuery<User["id"], Error>(
    [REACT_QUERY_KEY.PROJECT_OWNER_ID, projectSecretKey],
    () => getProjectOwnerId(projectSecretKey),
    {
      enabled: !!accessToken && projectSecretKey.length > 0
    }
  );

  return { projectOwnerId, isLoading, error };
};
