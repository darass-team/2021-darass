import { useQuery } from "react-query";
import { NoEmitOnErrorsPlugin } from "webpack";
import { REACT_QUERY_KEY } from "../constants";
import { QUERY } from "../constants/api";
import { Project } from "../types/project";
import { request } from "../utils/request";

const getProject = async (id: Project["id"]) => {
  try {
    const response = await request.get(`${QUERY.PROJECT}/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useGetProject = (id: Project["id"]) => {
  const {
    data: project,
    isLoading,
    error
  } = useQuery<Project, Error>([REACT_QUERY_KEY.PROJECT, id], () => getProject(id), {
    retry: false
  });

  return { project, isLoading, error };
};
