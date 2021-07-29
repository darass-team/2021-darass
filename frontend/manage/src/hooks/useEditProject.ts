import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { EditProjectRequest, Project } from "../types/project";
import { request } from "../utils/request";

const _editProject = async ({ id, name, description }: EditProjectRequest) => {
  try {
    const response = await request.patch(`${QUERY.PROJECT}/${id}`, {
      name,
      description
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useEditProject = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation<void, Error, EditProjectRequest>(data => _editProject(data), {
    onSuccess: (_, editedProject) => {
      queryClient.setQueryData<Project[] | undefined>(REACT_QUERY_KEY.PROJECTS, projects => {
        return projects?.map(project => {
          if (project.id === editedProject.id) {
            return { ...project, name: editedProject.name, description: editedProject.description };
          }

          return project;
        });
      });
    }
  });

  const isLoading = editMutation.isLoading;
  const error = editMutation.error;

  const editProject = async (data: EditProjectRequest) => {
    return await editMutation.mutateAsync(data);
  };

  return { editProject, isLoading, error };
};
