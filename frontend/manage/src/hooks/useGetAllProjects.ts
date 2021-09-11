import { REACT_QUERY_KEY } from "@/constants";
import { QUERY } from "@/constants/api";
import { Project } from "@/types/project";
import { AlertError } from "@/utils/error";
import { request } from "@/utils/request";
import axios from "axios";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useUser } from ".";

const getAllProjects = async () => {
  try {
    const response = await request.get(QUERY.PROJECT);

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 800) {
      throw new AlertError("로그인이 필요합니다.");
    }

    throw new AlertError("프로젝트 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useGetAllProjects = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const {
    data: projects,

    error
  } = useQuery<Project[], Error>([REACT_QUERY_KEY.PROJECTS], getAllProjects);

  useEffect(() => {
    if (user) {
      queryClient.invalidateQueries([REACT_QUERY_KEY.PROJECTS]);
    }
  }, [user]);

  return { projects, error };
};
