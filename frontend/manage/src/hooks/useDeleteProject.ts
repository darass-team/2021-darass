import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { Project } from "../types/project";
import { request } from "../utils/request";

const _deleteProject = async (id: Project["id"]) => {
  try {
    await request.delete(`${QUERY.PROJECT}/${id}`);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, Project["id"]>(id => _deleteProject(id), {
    onSuccess: (_, id) => {
      queryClient.setQueryData<Project[] | undefined>(REACT_QUERY_KEY.PROJECTS, projects => {
        return projects?.filter(project => project.id !== id);
      });
    }
  });

  const isLoading = deleteMutation.isLoading;
  const error = deleteMutation.error;

  const deleteProject = async (id: Project["id"]) => {
    return await deleteMutation.mutateAsync(id);
  };

  return { deleteProject, isLoading, error };
};
