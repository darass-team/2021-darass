import { useQuery } from "react-query";
import { REACT_QUERY_KEY } from "../constants";
import { QUERY } from "../constants/api";
import { Project } from "../types/project";
import { request } from "../utils/request";

const getAllProjects = async () => {
  const data = await request.get(QUERY.PROJECT);

  return data;
};

const useGetAllProjects = () => {
  const {
    data: projects,
    isLoading,
    error
  } = useQuery<Project[], Error>(REACT_QUERY_KEY.PROJECTS, () => getAllProjects());

  return { projects, isLoading, error };
};

export { useGetAllProjects };
