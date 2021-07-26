import { useQuery } from "react-query";
import { REACT_QUERY_KEY } from "../constants";
import { QUERY } from "../constants/api";
import { Project } from "../types/project";
import { request } from "../utils/request";

const getAllProjects = async () => {
  try {
    const response = await request.get(QUERY.PROJECT);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useGetAllProjects = () => {
  const {
    data: projects,
    isLoading,
    error
  } = useQuery<Project[], Error>(REACT_QUERY_KEY.PROJECTS, () => getAllProjects());

  return { projects, isLoading, error };
};
