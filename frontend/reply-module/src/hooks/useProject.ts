import { useQuery } from "react-query";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { Project } from "../types/project";
import { GetProjectRequestParams } from "../types/comment";
import { request } from "../utils/request";
import { QUERY } from "../constants/api";

const getProject = async (projectSecretKey: GetProjectRequestParams["projectSecretKey"]) => {
  if (!projectSecretKey) return undefined;

  const response = await request.get(QUERY.GET_PROJECT(projectSecretKey));

  if (response.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data;
};

const useProject = ({ projectSecretKey }: GetProjectRequestParams) => {
  const {
    data: project,
    isLoading,
    error
  } = useQuery<Project, Error>(REACT_QUERY_KEY.PROJECT, () => getProject(projectSecretKey));

  return { project, isLoading, error };
};

export { useProject };
