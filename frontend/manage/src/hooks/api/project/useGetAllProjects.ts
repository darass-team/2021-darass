import { QUERY } from "@/constants/api";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { useUserContext } from "@/hooks/context/useUserContext";
import { Project } from "@/types/project";
import { AlertError } from "@/utils/alertError";
import { request } from "@/utils/request";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "simple-react-query";

const getAllProjects = async () => {
  try {
    const response = await request.get(QUERY.PROJECT);

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 806 || error.response?.data.code === 801) {
      const newError = new Error("액세스 토큰이 존재하지 않습니다.");
      newError.name = NO_ACCESS_TOKEN;

      throw newError;
    }

    throw new AlertError("프로젝트 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useGetAllProjects = (enabled = false) => {
  const { user, logout } = useUserContext();
  const {
    data: projects,
    error,
    isSuccess,
    refetch,
    isLoading,
    isFetched
  } = useQuery<Project[]>({
    query: getAllProjects,
    enabled
  });

  useEffect(() => {
    if (user) refetch();
  }, [user]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error]);

  return { projects, error, isSuccess, isLoading, isFetched };
};
