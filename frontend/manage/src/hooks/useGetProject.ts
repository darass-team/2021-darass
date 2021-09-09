import axios from "axios";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useUser } from ".";
import { REACT_QUERY_KEY } from "../constants";
import { QUERY } from "../constants/api";
import { Project } from "../types/project";
import { AlertError } from "../utils/error";
import { request } from "../utils/request";

const getProject = async (id: Project["id"]) => {
  try {
    const response = await request.get(`${QUERY.PROJECT}/${id}`, { withCredentials: true });

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 806) {
      const newError = new Error("액세스 토큰이 존재하지 않습니다.");
      newError.name = "noAccessToken";

      throw newError;
    }

    if (error.response?.data.code === 801) {
      throw new AlertError("로그인이 필요합니다.");
    }

    if (error.response?.data.code === 700) {
      throw new AlertError("존재하지 않는 프로젝트입니다.");
    }

    throw new AlertError("프로젝트 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useGetProject = (id: Project["id"]) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    data: project,
    isLoading,
    error
  } = useQuery<Project, Error>([REACT_QUERY_KEY.PROJECT, id], () => getProject(id), {
    retry: false
  });

  useEffect(() => {
    queryClient.invalidateQueries([REACT_QUERY_KEY.PROJECT, id]);
  }, [user]);

  return { project, isLoading, error };
};
