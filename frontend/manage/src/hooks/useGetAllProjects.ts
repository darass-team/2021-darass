import axios from "axios";
import { useQuery } from "react-query";
import { REACT_QUERY_KEY, ROUTE } from "../constants";
import { QUERY } from "../constants/api";
import { Project } from "../types/project";
import { AlertError } from "../utils/error";
import { request } from "../utils/request";

const getAllProjects = async () => {
  try {
    const response = await request.get(QUERY.PROJECT);

    return response.data;
  } catch (error) {
    console.error(error);

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
  const { data: projects, isLoading, error } = useQuery<Project[], Error>(REACT_QUERY_KEY.PROJECTS, getAllProjects);

  return { projects, isLoading, error };
};
