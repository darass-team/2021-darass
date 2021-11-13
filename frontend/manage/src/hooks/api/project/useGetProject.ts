import { QUERY } from "@/constants/api";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { useUserContext } from "@/context/userContext";
import { Project } from "@/types/project";
import { AlertError } from "@/utils/alertError";
import { request } from "@/utils/request";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "simple-react-query";

const getProject = async (id: Project["id"]) => {
  try {
    const response = await request.get(`${QUERY.PROJECT}/${id}`);

    return response.data;
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

interface Props {
  id: Project["id"];
}

export const useGetProject = ({ id }: Props) => {
  const { user, logout } = useUserContext();

  const {
    data: project,
    isLoading,
    error,
    isSuccess,
    refetch,
    isFetched
  } = useQuery<Project>({
    query: () => getProject(id),
    enabled: false
  });

  useEffect(() => {
    if (user && !Number.isNaN(id)) refetch();
  }, [user, id]);

  useEffect(() => {
    if (error) logout();
  }, [error]);

  return { project, isLoading, error, isSuccess, refetch, isFetched };
};
