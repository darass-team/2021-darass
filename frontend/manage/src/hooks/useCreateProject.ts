import { useMutation, useQueryClient } from "react-query";
import { REACT_QUERY_KEY } from "../constants";
import { QUERY } from "../constants/api";
import { CreateProjectRequest, Project } from "../types/project";
import { request } from "../utils/request";

const _createProject = async ({ name, description }: CreateProjectRequest) => {
  try {
    const response = await request.post(QUERY.PROJECT, { name, description });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<Project, Error, CreateProjectRequest>(data => _createProject(data), {
    onSuccess: data => {
      queryClient.setQueryData<Project[] | undefined>(REACT_QUERY_KEY.PROJECT, projects => {
        return projects?.concat(data);
      });
    }
  });

  const isLoading = createMutation.isLoading;
  const error = createMutation.error;

  const createProject = async (data: CreateProjectRequest) => {
    const project = await createMutation.mutateAsync(data);

    return project;
  };

  return { createProject, isLoading, error };
};
