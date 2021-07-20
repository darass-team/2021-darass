import { useQuery } from "react-query";
import { REACT_QUERY_KEY } from "../constants";
import { QUERY } from "../constants/api";
import { Project } from "../types/project";
import { request } from "../utils/request";

const getProject = async (id: Project["id"]) => {
  const response = await request.get(`${QUERY.PROJECT}/${id}`);

  if (response.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data;
};

const useGetProject = (id: Project["id"]) => {
  const {
    data: project,
    isLoading,
    error
  } = useQuery<Project, Error>([REACT_QUERY_KEY.PROJECT, id], () => getProject(id));

  return { project, isLoading, error };
};

export { useGetProject };
