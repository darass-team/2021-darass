import { useMutation, useQueryClient } from "react-query";
import { REACT_QUERY_KEY } from "../constants";
import { QUERY } from "../constants/api";
import { Project } from "../types/project";
import { request } from "../utils/request";

const _createProject = async (name: Project["name"]) => {
  const data = await request.post(QUERY.PROJECT, { name });

  return data;
};

const useCreateProject = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<Project, Error, Project["name"]>(name => _createProject(name), {
    onSuccess: data => {
      queryClient.setQueryData<Project[] | undefined>(REACT_QUERY_KEY.PROJECT, projects => {
        return projects?.concat(data);
      });
    }
  });

  const isLoading = createMutation.isLoading;
  const error = createMutation.error;

  const createProject = async (name1: Project["name"]) => {
    const project = await createMutation.mutateAsync(name1);

    return project;
  };

  return { createProject, isLoading, error };
};

export { useCreateProject };
