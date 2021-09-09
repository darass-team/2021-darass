import { useQuery } from "react-query";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { Project } from "../types/project";
import { GetProjectRequestParams } from "../types/comment";
import { request } from "../utils/request";
import { QUERY } from "../constants/api";
import axios from "axios";
import { AlertError } from "../utils/Error";

const getProject = async (projectSecretKey: GetProjectRequestParams["projectSecretKey"]) => {
  if (!projectSecretKey) return undefined;

  try {
    const response = await request.get(QUERY.GET_PROJECT(projectSecretKey));

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 700) {
      throw new Error("해당하는 프로젝트가 존재하지 않습니다.\n관리자에게 문의하시기 바랍니다.");
    }

    throw new Error("프로젝트를 불러오는데 문제가 발생하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useGetProject = ({ projectSecretKey }: GetProjectRequestParams) => {
  const {
    data: project,
    isLoading,
    error
  } = useQuery<Project, Error>(REACT_QUERY_KEY.PROJECT, () => getProject(projectSecretKey));

  return { project, isLoading, error };
};
